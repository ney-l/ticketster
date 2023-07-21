import { useToast } from '@/components/ui';
import axios from 'axios';
import { useState } from 'react';

interface RequestProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  successMessage?: string;
}

export const useRequest = ({
  url,
  method,
  body,
  successMessage,
}: RequestProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorResponse[] | null>(null);
  const [data, setData] = useState<any>(null);

  const sendRequest = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios[method](url, body);
      toast({
        title: successMessage ?? 'Success 🎉',
      });
      setData(data);
    } catch (err) {
      const errors = parseErrors(err);

      errors.map((err) =>
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        })
      );

      setErrors(errors);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, isLoading, errors, data };
};

export interface ErrorResponse {
  message: string;
}

const parseErrors = (error: unknown): ErrorResponse[] => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.errors;
  }

  if (error instanceof Error) {
    return [{ message: error.message }];
  }

  const FALLBACK_ERROR = 'Something went wrong';
  return [{ message: FALLBACK_ERROR }];
};
