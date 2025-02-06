import { Claims } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getUser } from "@/features/users/actions";

export const Header = async (props: Claims) => {
  const { user } = props;
  const userProfile = await getUser(user.sub);
  if (!userProfile) notFound();

  return (
    <div>
      <Link href={`/users/${userProfile.id}`}>{user.name}</Link>
      <span>これは仮のヘッダーです</span>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
};
