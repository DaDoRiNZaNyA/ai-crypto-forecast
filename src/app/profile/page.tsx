import { getCurrentUser } from "@/entitites/user/server";
import { ProfileForm } from "@/features/profile";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export default async function Profile() {
  const currentUser = await getCurrentUser();
  let currentEmail = "";

  if (currentUser.type === "right" && currentUser.value.email) {
    currentEmail = currentUser.value.email;
  } else {
    redirect(routes.signIn());
  }

  return <ProfileForm currentEmail={currentEmail} />;
}
