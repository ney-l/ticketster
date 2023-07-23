import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui';
import { Header } from '@/components';
import { API_ENDPOINTS, buildApiClient, parseErrors } from '@/lib';
import './globals.css';

const getUser = async () => {
  try {
    const cookieStore = cookies();
    const apiClient = buildApiClient(cookieStore);
    const {
      data: { currentUser },
    } = await apiClient.get(API_ENDPOINTS.CURRENT_USER);

    return currentUser;
  } catch (err) {
    const errors = parseErrors(err);
    console.log(errors);
  }
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ticketster 🎟️',
  description: 'Get Your Tickets',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header user={user} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
