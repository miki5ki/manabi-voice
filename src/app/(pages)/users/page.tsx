import { notFound } from "next/navigation";

import { DeactivateButton } from "@/app/components/DeactivateButton";
import { getValidSession } from "@/features/auth/actions";
import { getAppUser, getAppUsers } from "@/features/users/actions";

const page = async () => {
  const session = await getValidSession();
  const loginUserProfile = await getAppUser(session.user.appUserId);
  if (!loginUserProfile || loginUserProfile.role == "user") notFound();
  const appUsers = await getAppUsers(loginUserProfile.role);
  if (!appUsers) notFound();

  return (
    <>
      <div>管理者向けページです</div>
      {appUsers &&
        appUsers.map((appUser) => (
          <div key={appUser.id}>
            <span>{appUser.name}</span>
            <span>{appUser.email}</span>
            <span>{appUser.id}</span>
            <DeactivateButton
              deactivateInfo={{
                appUserId: appUser.id,
                loginUserId: loginUserProfile.id,
                loginUserRole: loginUserProfile.role,
              }}
            />
          </div>
        ))}
    </>
  );
};

export default page;
