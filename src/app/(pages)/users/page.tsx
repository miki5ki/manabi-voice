import { notFound } from "next/navigation";

import { DeactivateButton } from "@/app/components/DeactivateButton";
import { getValidSession } from "@/features/auth/actions";
import { getAppUsers } from "@/features/users/actions";
import { assertHasPermission } from "@/lib/permission";

const page = async () => {
  const session = await getValidSession();
  const appUsers = await getAppUsers(session.user.appUserRole);
  assertHasPermission(session.user.appUserRole, "user:deactivate");
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
            <DeactivateButton appUserId={appUser.id} />
          </div>
        ))}
    </>
  );
};

export default page;
