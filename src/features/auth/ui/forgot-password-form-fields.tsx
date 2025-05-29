"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { resetPasswordAction } from "../actions/reset-password";

const FormSchema = z.object({
  email: z.string().email("Invalid email"),
});

export const ForgotPasswordFormFields = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email } = data;

    setIsPending(true);

    const result = await resetPasswordAction(email);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Check your email for a reset link");
    }

    setIsPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          variant="outline"
          className="w-full"
          type="submit"
        >
          Reset
        </Button>
      </form>
    </Form>
  );
};
