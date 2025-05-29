export const routes = {
  home: () => "/",
  signIn: () => "/sign-in",
  signUp: () => "/sign-up",
  coin: (id: string) => `/coins/${id}`,
  forgotPassword: () => "/forgot-password",
  resetPassword: () => "/reset-password",
  profile: () => "/profile",
  authHandle: () => "/handle",
  callback: () => "/callback",
};
