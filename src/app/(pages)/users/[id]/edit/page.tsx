import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button, Card, Grid2, Stack, SxProps, TextField, Theme } from "@mui/material";
import { notFound } from "next/navigation";

import { DeactivateButton } from "@/app/components/DeactivateButton";
import { getValidSession } from "@/features/auth/actions";
import { getAppUser, updateAppUser } from "@/features/users/actions";

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

const page = async () => {
  const session = await getValidSession();
  const appUser = await getAppUser(session.user.appUserId);

  if (!appUser) notFound();

  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <Grid2 display="flex" justifyContent="center" mt={4}>
          <Avatar>
            <AccountCircle fontSize="large" />
          </Avatar>
        </Grid2>
        <form action={updateAppUser}>
          <Stack m={3} spacing={3}>
            <input name="appUserId" hidden defaultValue={appUser.id} />
            <TextField label="ユーザー名" defaultValue={appUser.name} name="appUserName"></TextField>
            <TextField label="メールアドレス" defaultValue={appUser.email} name="appUserEmail"></TextField>
            <TextField
              label="自己紹介文"
              multiline
              defaultValue={appUser.description}
              name="appUserDescription"
            ></TextField>
          </Stack>
          <Grid2 display="flex" justifyContent="center" m={5}>
            <Button variant="contained" type="submit">
              保存
            </Button>
          </Grid2>
        </form>
      </Card>
      <DeactivateButton
        deactivateInfo={{
          appUserId: appUser.id,
          loginUserId: session.user.appUserId,
          loginUserRole: session.user.role,
        }}
      />
    </>
  );
};

export default page;
