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
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .email('Not a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(8, 'Password must be between 8 and 20 characters')
    .max(20, 'Password must be between 8 and 20 characters')
    .refine((value) => /[a-zA-Z]/.test(value), {
      message: 'Password must contain at least one alphabet character',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one numeric character',
    })
    .refine((value) => /[!@#$%^&*()]/.test(value), {
      message: 'Password must contain at least one symbol character',
    }),
});

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
