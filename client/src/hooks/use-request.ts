import axios from 'axios';
import { useState } from 'react';
import { useToast } from '@/components/ui';
import { ErrorResponse, parseErrors } from '@/lib';

interface RequestProps {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: any;
  successMessage?: string;
  onSuccess?: (data: any) => void;
}

export const useRequest = ({
  url,
  method,
  body,
  successMessage,
  onSuccess,
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

      if (onSuccess) {
        onSuccess(data);
      }
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
