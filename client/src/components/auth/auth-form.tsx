'use client';

import { useRouter, usePathname } from 'next/navigation';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
} from '@/components/ui';
import { useRequest } from '@/hooks';
import { API_ENDPOINTS } from '@/lib';

export const authFormSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .trim()
    .email('Not a valid email.'),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .trim()
    .min(8, 'Password must be between 8 and 20 characters.')
    .max(20, 'Password must be between 8 and 20 characters.')
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: 'Password must contain at least one alphabet character.',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one numeric character.',
    })
    .refine((value) => /[!@#$%^&*()]/.test(value), {
      message: 'Password must contain at least one symbol character.',
    }),
});

export function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  const isSignup = pathname === '/auth/signup';

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: ' ',
      password: '',
    },
  });

  const { sendRequest } = useRequest({
    method: 'post',
    url: isSignup ? API_ENDPOINTS.SIGN_UP : API_ENDPOINTS.SIGN_IN,
    body: {
      email: form.getValues('email').trim(),
      password: form.getValues('password').trim(),
    },
    successMessage: isSignup ? 'Sign up successful! 🎉' : 'Signed in!',
    onSuccess: () => router.push('/'),
  });

  const onSubmit = () => {
    sendRequest();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-8">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="my-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
