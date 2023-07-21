'use client';

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

const SIGNUP_API_ENDPOINT = '/api/users/signup';

export const signupFormSchema = z.object({
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

export default function Signup() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: ' ',
      password: '',
    },
  });
  const { sendRequest } = useRequest({
    method: 'post',
    url: SIGNUP_API_ENDPOINT,
    body: {
      email: form.getValues('email'),
      password: form.getValues('password'),
    },
    successMessage: 'Sign up successful! 🎉',
  });

  const onSubmit = async (credentials: z.infer<typeof signupFormSchema>) => {
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
