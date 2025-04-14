import { AppBar, Avatar, Box, Button, Container, Toolbar } from "@mui/material";
import Link from "next/link";

import { getValidSession } from "@/features/auth/actions";

import { Settings } from "./Settings";

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export const Header = async () => {
  const session = await getValidSession();
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
            <Settings session={session} />
          </Box>
        </Container>
      </AppBar>
    </>
  );
};
