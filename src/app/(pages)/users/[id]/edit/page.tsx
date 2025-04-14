import { notFound } from "next/navigation";

import { DeactivateButton } from "@/app/components/DeactivateButton";
import { getValidSession } from "@/features/auth/actions";
import { getAppUser, updateAppUser } from "@/features/users/actions";

const page = async () => {
  const session = await getValidSession();
  const appUser = await getAppUser(session.user.appUserId);

  if (!appUser) notFound();

  return (
    <>
      <form method="POST" action={updateAppUser}>
        <input name="userId" hidden defaultValue={appUser.id} />
        <input type="text" name="userName" required defaultValue={appUser.name} />
        <input type="text" name="userEmail" required defaultValue={appUser.email} />
        <button>更新</button>
      </form>
      <DeactivateButton
        deactivateInfo={{
          appUserId: appUser.id,
          loginUserId: session.user.appUserId,
          loginUserRole: session.user.role,
        }}
      />
    </>
  );
};

export default page;
