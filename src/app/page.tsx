import UserProfile from "@/features/users/UserProfile";

const Page = () => {
  return (
    <div>
      <h1>これはトップページです</h1>
      <a href="/api/auth/logout">Logout</a>
      <br></br>
      <a href="/api/auth/login">Login</a>
      <UserProfile />
    </div>
  );
};

export default Page;
