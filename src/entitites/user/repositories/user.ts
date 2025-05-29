import { routes } from "@/kernel/routes";
import { createClient } from "@/shared/lib/sse/supabaseServerClient";
import { User } from "@supabase/supabase-js";

const signUp = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
};

const signIn = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
};

const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

const getCurrentUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

const updateUser = async ({
  email,
  password,
}: {
  email: string;
  password?: string;
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({ email, password });
  return {
    user: data.user,
    error: error?.message ?? null,
  };
};

const resetPassword = async (email: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: process.env.NEXT_PUBLIC_FRONTEND_URL + routes.callback(),
  });

  return {
    data,
    error: error?.message ?? null,
  };
};

const exchangeCodeForSession = async (code: string) => {
  const supabase = await createClient();
  return await supabase.auth.exchangeCodeForSession(code);
};

export const userRepository = {
  signUp,
  signIn,
  logout,
  getCurrentUser,
  updateUser,
  resetPassword,
  exchangeCodeForSession,
};
