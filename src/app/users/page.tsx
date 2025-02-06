import { notFound } from "next/navigation";

import { getAuth0User } from "@/features/auth/actions";
import { getUsers } from "@/features/users/actions";

import { DeactivateButton } from "../components/DeactivateButton";

const page = async () => {
  const loginUserProfile = await getAuth0User(true);
  if (!loginUserProfile || loginUserProfile.role == "user") notFound();
  const userProfiles = await getUsers(loginUserProfile.role);
  if (!userProfiles) notFound();

  return (
    <>
      <div>管理者向けページです</div>
      {userProfiles &&
        userProfiles.map((userProfile) => (
          <div key={userProfile.id}>
            <span>{userProfile.name}</span>
            <span>{userProfile.email}</span>
            <span>{userProfile.id}</span>
            <DeactivateButton
              deactivateInfo={{
                loginUserId: loginUserProfile.id,
                loginUserRole: loginUserProfile.role,
                userProfileId: userProfile.id,
              }}
            />
          </div>
        ))}
    </>
  );
};

export default page;
