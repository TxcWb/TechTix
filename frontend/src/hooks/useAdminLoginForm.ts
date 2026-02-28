import { AuthError, signIn } from 'aws-amplify/auth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useNotifyToast } from '@/hooks/useNotifyToast';
import { useCurrentAdminUser } from './useCurrentUser';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginFormSchema = z.object({
  email: z.email({
    message: 'Please enter a valid email address'
  }),
  password: z.string().min(8, {
    message: 'Please enter at least 8 characters'
  })
});

export const useAdminLoginForm = (onNewPasswordRequired?: () => void) => {
  const auth = useCurrentAdminUser();
  const { errorToast, infoToast } = useNotifyToast();
  const { navigate } = useNavigateTo();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const submit = form.handleSubmit(async ({ email, password }) => {
    try {
      const { nextStep } = await signIn({
        username: email,
        password
      });
      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        infoToast({
          id: 'new-password-required',
          title: 'Password change required',
          description: 'Your temporary password must be changed before you can continue.'
        });
        onNewPasswordRequired?.();
        return;
      }
      await auth.refetchUser?.();
      navigate('/admin/events');
    } catch (e) {
      if (e instanceof AuthError) {
        errorToast({
          id: 'sign-in-error',
          title: 'There was a problem signing in.',
          description: e.message
        });
      } else {
        console.error(e);
        errorToast({
          id: 'sign-in-error',
          title: 'There was a problem signing in.',
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
