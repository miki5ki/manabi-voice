import { Claims } from "@auth0/nextjs-auth0";
import { AppBar, Avatar, Box, Button, Container, Toolbar } from "@mui/material";
import { notFound } from "next/navigation";

import { getUser } from "@/features/users/actions";

import { Settings } from "./Settings";

export const Header = async (props: Claims) => {
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
                  <Button key={page.link} href={page.link} color="inherit">
                    {page.title}
                  </Button>
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
