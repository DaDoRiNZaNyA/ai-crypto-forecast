import { prisma } from "@/shared/lib/sse/db";
import { supabase } from "@/shared/lib/sse/supabaseClient";
import { User } from "@supabase/supabase-js";

const signUp = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data.user,
    error: error?.message ?? null,
  };
};

const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

const createUser = async (user: User) => {
  return prisma.user.create({
    data: {
      id: user.id,
      email: user.email ?? "",
      name: user.user_metadata?.name ?? null,
    },
  });
};

const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const userRepository = {
  signUp,
  signIn,
  getCurrentUser,
  createUser,
  findUserById,
  findUserByEmail,
};
