"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import { AccountCircle } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export const Settings = (props: { userProfile: UserProfile }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { id } = props.userProfile;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const pageItems = [
    { title: "マイページ", link: `/users/${id}` },
    { title: "ログアウト", link: "/api/auth/logout" },
  ];

  return (
    <Box>
      <Tooltip title="設定">
        <IconButton onClick={handleClick} color="inherit" size="large">
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {pageItems.map((pageItem) => (
          <MenuItem component={Link} href={pageItem.link} key={pageItem.link}>
            <Typography textAlign="center">{pageItem.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
