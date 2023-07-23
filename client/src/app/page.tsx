import { cookies } from 'next/headers';

import { API_ENDPOINTS, buildApiClient, parseErrors } from '@/lib';

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

export default async function Home() {
  const user = await getUser();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {user ? (
        <h1>You are signed in ✅</h1>
      ) : (
        <h1> You are NOT signed in ❌</h1>
      )}
    </main>
  );
}
