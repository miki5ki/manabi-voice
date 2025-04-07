import { User } from "@auth0/nextjs-auth0/types";
import { AppBar, Avatar, Box, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getUser } from "@/features/users/actions";

import { Settings } from "./Settings";

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export const Header = async (props: { user: User }) => {
  const { user } = props;
  const userProfile = await getUser(user.sub);
  if (!userProfile) notFound();
  const pages = [
    { title: "カテゴリー", link: "/categories" },
    { title: "チャンネル", link: "/channels" },
    { title: "エピソード", link: "/episodes" },
  ];

  return (
    <>
      <AppBar position="static" color="secondary">
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Toolbar>
              <Avatar src="/logo.png" alt="ロゴ" sx={{ height: 52, mr: 3, width: 52 }} />
              <Box>
                {pages.map((page) => (
                  <Link key={page.link} href={page.link} passHref style={linkStyle}>
                    <Button color="inherit">{page.title}</Button>
                  </Link>
                ))}
              </Box>
            </Toolbar>
            <Settings userProfile={userProfile} />
          </Box>
        </Container>
      </AppBar>
    </>
  );
};
