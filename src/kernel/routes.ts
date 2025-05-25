export const routes = {
  home: () => "/",
  signIn: () => "/sign-in",
  signUp: () => "/sign-up",
  coin: (id: string) => `/coins/${id}`,
};
