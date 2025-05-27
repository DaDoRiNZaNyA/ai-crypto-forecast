export type AuthRequest = {
  email: string;
  password: string;
};

export type User = {
  name: string | null;
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
