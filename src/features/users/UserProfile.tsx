import { getSession } from "@auth0/nextjs-auth0";

const UserProfile = async () => {
  const { user } = await getSession();

  if (!user) {
    return <p>該当のユーザーが見つかりません</p>;
  }

  return (
    <>
      <p>{user.email}</p>
      <p>{user.name}</p>
    </>
  );
};
export default UserProfile;
