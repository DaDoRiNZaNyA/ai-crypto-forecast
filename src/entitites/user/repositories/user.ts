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

export const userRepository = {
  signUp,
  signIn,
  logout,
  getCurrentUser,
  updateUser,
};
