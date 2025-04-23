import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Divider, Grid2, Stack, SxProps, Theme, Typography } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getValidSession } from "@/features/auth/actions";
import { getAppUser } from "@/features/users/actions";

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

export const Page = async () => {
  const session = await getValidSession();
  const appUser = await getAppUser(session.user.appUserId);

  if (!appUser) notFound();

  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <Grid2 display="flex" justifyContent="center" alignItems="center" my={5}>
          <Grid2 mr={3}>
            <Avatar>
              <AccountCircle fontSize="large" />
            </Avatar>
          </Grid2>
          <Stack spacing={1}>
            <Typography variant="h5">{appUser.name}</Typography>
            <Typography>{appUser.email}</Typography>
          </Stack>
        </Grid2>
        <Grid2>
          <Divider />
          <Box mt={2} textAlign="center" width="100%" mx="auto">
            <Typography>自己紹介</Typography>
            <Typography p={3}>{appUser.description}</Typography>
          </Box>
        </Grid2>
      </Card>
      <Grid2 display="flex" justifyContent="center" m={5}>
        <Link href={`/users/${appUser.id}/edit`} passHref>
          <Button variant="contained">編集する</Button>
        </Link>
      </Grid2>
    </>
  );
};

export default Page;
