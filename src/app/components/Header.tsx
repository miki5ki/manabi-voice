import { Claims } from "@auth0/nextjs-auth0";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { notFound } from "next/navigation";

import { getUser } from "@/features/users/actions";

export const Header = async (props: Claims) => {
  const { user } = props;
  const userProfile = await getUser(user.sub);
  if (!userProfile) notFound();

  const pagesInfo = [
    { id: 1, title: "カテゴリー", link: "/categories" },
    { id: 2, title: "チャンネル", link: "/channels" },
    { id: 3, title: "エピソード", link: "/episodes" },
    { id: 4, title: "マイページ", link: `/users/${userProfile.id}` },
    { id: 5, title: "ログアウト", link: "/api/auth/logout" },
  ];

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar>
          <Box>
            {pagesInfo.map((pageInfo) => (
              <Button key={pageInfo.id} href={pageInfo.link} color="inherit">
                {pageInfo.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton>
                <Avatar alt="Remy Sharp" src="https://picsum.photos/id/236/360/180?grayscale" />
              </IconButton>
            </Tooltip>
            <Menu open={true}>
              <MenuItem>
                <Typography sx={{ textAlign: "center" }}>aaaaaa</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
