import { AuthError, confirmSignIn, signOut } from 'aws-amplify/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useNotifyToast } from '@/hooks/useNotifyToast';
import { zodResolver } from '@hookform/resolvers/zod';

const NewPasswordFormSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: 'Please enter at least 8 characters'
    }),
    confirmPassword: z.string().min(8, {
      message: 'Please enter at least 8 characters'
    })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export const useNewPasswordForm = () => {
  const { errorToast, successToast } = useNotifyToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof NewPasswordFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const submit = form.handleSubmit(async ({ newPassword }) => {
    try {
      await confirmSignIn({ challengeResponse: newPassword });
      await signOut();
      successToast({
        title: 'Password updated successfully',
        description: 'Please log in with your new password.'
      });
      navigate('/admin/login');
    } catch (e) {
      if (e instanceof AuthError) {
        errorToast({
          id: 'new-password-error',
          title: 'There was a problem setting your new password.',
          description: e.message
        });
      } else {
        console.error(e);
        errorToast({
          id: 'new-password-error',
          title: 'There was a problem setting your new password.',
          description: 'An unexpected error occurred.'
        });
      }
    }
  });

  return {
    form,
    submit,
    isSubmitting: form.formState.isSubmitting
  };
};
