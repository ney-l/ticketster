import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signin | Ticketster 🎟️',
  description: 'Sign in to your account',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl font-bold tracking-widest">Sign in</h2>
      <p className="text-muted">Sign in to your account</p>
      {children}
    </>
  );
}
