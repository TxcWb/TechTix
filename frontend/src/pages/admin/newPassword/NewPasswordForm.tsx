import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import Button from '@/components/Button';
import { FormItem, FormLabel, FormError } from '@/components/Form';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { useNewPasswordForm } from '@/hooks/useNewPasswordForm';

const NewPasswordForm = () => {
  const { form, submit, isSubmitting } = useNewPasswordForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prev) => !prev);
  const onShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="space-y-8">
          <FormItem name="newPassword">
            {({ field }) => (
              <div className="flex flex-col items-start space-y-2">
                <FormLabel>New Password</FormLabel>
                <div className="w-full inline-flex items-center">
                  <Input type={showPassword ? 'text' : 'password'} {...field} className="pr-8" />
                  <Icon
                    name={showPassword ? 'EyeOff' : 'Eye'}
                    className="-ml-8 cursor-pointer hover:text-muted-foreground transition-colors"
                    onClick={onShowPassword}
                  />
                </div>
                <FormError />
              </div>
            )}
          </FormItem>

          <FormItem name="confirmPassword">
            {({ field }) => (
              <div className="flex flex-col items-start space-y-2">
                <FormLabel>Confirm Password</FormLabel>
                <div className="w-full inline-flex items-center">
                  <Input type={showConfirmPassword ? 'text' : 'password'} {...field} className="pr-8" />
                  <Icon
                    name={showConfirmPassword ? 'EyeOff' : 'Eye'}
                    className="-ml-8 cursor-pointer hover:text-muted-foreground transition-colors"
                    onClick={onShowConfirmPassword}
                  />
                </div>
                <FormError />
              </div>
            )}
          </FormItem>
        </div>

        <div className="flex justify-end mt-4">
          <Button type="submit" className="w-full min-w-min max-w-[20%]" loading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default NewPasswordForm;
