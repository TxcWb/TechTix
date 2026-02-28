import { TECHTIX_72 } from '@/assets/techtix';
import { Toaster } from '@/components/Toast/Toaster';
import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage = () => {
  return (
    <>
      <main className="h-full max-w-[1080px] mx-auto my-0 p-8 pt-32">
        <div className="w-full flex justify-center">
          <section className="flex flex-col space-y-4 w-full max-w-2xl">
            <header className="flex justify-center">
              <img src={TECHTIX_72} className="w-24 md:w-32" alt="TechTix Logo" />
            </header>
            <h4>Set New Password</h4>
            <p className="text-muted-foreground">Your account requires a new password. Please enter your new password below.</p>
            <NewPasswordForm />
          </section>
        </div>
      </main>
      <Toaster />
    </>
  );
};

export const Component = NewPasswordPage;

export default NewPasswordPage;
