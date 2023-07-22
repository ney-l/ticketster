import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup | Ticketster 🎟️',
  description: 'Create an account to get started',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-widest">Sign up</h2>
      <p className="text-muted">Create a new account</p>
      {children}
    </>
  );
}
