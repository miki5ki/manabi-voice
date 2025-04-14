import Link from "next/link";
import { notFound } from "next/navigation";

import { getValidSession } from "@/features/auth/actions";
import { getAppUser } from "@/features/users/actions";

export const Page = async () => {
  const session = await getValidSession();
  const appUser = await getAppUser(session.user.appUserId);

  if (!appUser) notFound();

  return (
    <>
      <div>{appUser.name}</div>
      <div>{appUser.email}</div>
      <div>{appUser.role}</div>
      <Link href={`/users/${appUser.id}/edit`}>編集</Link>
    </>
  );
};

export default Page;
