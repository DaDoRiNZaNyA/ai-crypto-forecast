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
import { updateProfileAction } from "../actions/update-profile-action";

const FormSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasPassword = !!data.password?.trim();
    const hasConfirm = !!data.confirmPassword?.trim();

    if (hasPassword || hasConfirm) {
      if (!hasPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required",
          path: ["password"],
        });
      } else if (data.password!.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          type: "string",
          inclusive: true,
          message: "Password must be at least 8 characters",
          path: ["password"],
        });
      }

      if (!hasConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Confirm password is required",
          path: ["confirmPassword"],
        });
      }

      if (hasPassword && hasConfirm && data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }
  });

export const ProfileFormFields = ({
  currentEmail,
}: {
  currentEmail: string;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: currentEmail,
      password: "",
      confirmPassword: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { email, password } = data;
    if (password || email !== currentEmail) {
      setIsPending(true);

      const { user, error } = await updateProfileAction({
        email,
        password: password || undefined,
      });

      if (error) {
        toast.error(error);
      } else if (user) {
        if (email === currentEmail) {
          toast.success("Password updated");
        } else {
          toast.success("A confirmation email has been sent to your email");
        }
      }

      setIsPending(false);
    }
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...field}
                />
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
          Save
        </Button>
      </form>
    </Form>
  );
};
