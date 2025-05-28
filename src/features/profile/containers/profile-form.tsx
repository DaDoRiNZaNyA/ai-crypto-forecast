"use client";

import { ProfileFormLayout } from "../ui/profile-form-layout";
import { ProfileFormFields } from "../ui/profile-form-fields";

export const ProfileForm = ({ currentEmail }: { currentEmail: string }) => {
  return (
    <ProfileFormLayout
      title="Profile"
      description=""
      form={<ProfileFormFields currentEmail={currentEmail} />}
    />
  );
};
