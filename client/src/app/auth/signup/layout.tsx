import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup | Ticketster 🎟️',
  description: 'Create an account to get started',
};

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div className="w-full">
          <h2 className="text-2xl font-bold tracking-widest">Sign up</h2>
          <p className="text-muted">Create a new account</p>
          <div className="flex-1 lg:max-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
