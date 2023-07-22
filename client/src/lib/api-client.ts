import axios from 'axios';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const buildApiClient = (cookieStore: ReadonlyRequestCookies) => {
  if (typeof window === 'undefined') {
    // run on the server
    const session = cookieStore.get('session');
    return axios.create({
      baseURL: process.env.CLUSTER_LOCAL_URL,
      headers: {
        Host: process.env.HOSTNAME,
        Cookie: session?.value ? `session=${session.value}` : '',
      },
      withCredentials: true,
    });
  } else {
    // runs on the browser
    return axios.create({ baseURL: '/' });
  }
};

export interface ErrorResponse {
  message: string;
}

const FALLBACK_ERROR = 'Something went wrong';

export const parseErrors = (error: unknown): ErrorResponse[] => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.errors;
  }

  if (error instanceof Error) {
    return [{ message: error.message }];
  }

  return [{ message: FALLBACK_ERROR }];
};
