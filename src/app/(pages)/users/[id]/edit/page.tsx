import { notFound } from "next/navigation";

import { DeactivateButton } from "@/app/components/DeactivateButton";
import { getAuth0User } from "@/features/auth/actions";
import { updateUser } from "@/features/users/actions";

const page = async () => {
  const userProfile = await getAuth0User(true);

  if (!userProfile) notFound();

  return (
    <>
      <form method="POST" action={updateUser}>
        <input name="userId" hidden defaultValue={userProfile.id} />
        <input type="text" name="userName" required defaultValue={userProfile.name} />
        <input type="text" name="userEmail" required defaultValue={userProfile.email} />
        <button>更新</button>
      </form>
      <DeactivateButton
        deactivateInfo={{
          loginUserId: userProfile.id,
          loginUserRole: userProfile.role,
          userProfileId: userProfile.id,
        }}
      />
    </>
  );
};

export default page;
