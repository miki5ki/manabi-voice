import Link from "next/link";
import { notFound } from "next/navigation";

import { getAuth0User } from "@/features/auth/actions";

export const Page = async () => {
  const userProfile = await getAuth0User(true);

  if (!userProfile) notFound();

  return (
    <>
      <div>{userProfile.name}</div>
      <div>{userProfile.email}</div>
      <div>{userProfile.role}</div>
      <Link href={`/users/${userProfile.id}/edit`}>編集</Link>
    </>
  );
};

export default Page;
