'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from '@/hooks';
import { API_ENDPOINTS } from '@/lib';

export default function Signout() {
  const router = useRouter();
  const { sendRequest } = useRequest({
    url: API_ENDPOINTS.SIGN_OUT,
    method: 'post',
    body: {},
    onSuccess: () => {
      router.refresh();
      router.replace('/');
    },
    showSuccessToast: false,
  });

  useEffect(() => {
    sendRequest();
  }, []);

  return <div>Signing you out...</div>;
}
