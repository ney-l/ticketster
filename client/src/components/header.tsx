'use client';

import Link from 'next/link';

import { BRAND } from '@/lib';
import { Button } from '@/components/ui';

interface Props {
  user?: { id: string; email: string };
}

export function Header({ user }: Props) {
  return (
    <nav className="flex flex-row items-center justify-between p-5">
      <div>
        <Link href="/">{BRAND.NAME}</Link>
      </div>
      <div>
        {user ? (
          <Link href="/auth/signout">
            <Button>Sign Out</Button>
          </Link>
        ) : (
          <>
            <Link href="/auth/signup" className="mr-5">
              <Button variant="link">Sign Up</Button>
            </Link>
            <Link href="/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
