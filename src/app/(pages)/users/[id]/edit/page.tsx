import { AccountCircle } from "@mui/icons-material";
import { Avatar, Button, Card, Grid2, Stack, SxProps, TextField, Theme } from "@mui/material";
import { notFound } from "next/navigation";

import { DeactivateButton } from "@/app/components/DeactivateButton";
import { getValidSession } from "@/features/auth/actions";
import { getAppUser, updateAppUser } from "@/features/users/actions";
import { assertIsOwner } from "@/lib/permission";

type Props = {
  params: {
    id: string;
  };
};

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

const page = async (props: Props) => {
  const { params } = props;
  const { id: createdAppUserId } = params;
  const session = await getValidSession();
  const appUser = await getAppUser(createdAppUserId);
  assertIsOwner(session.user.appUserId, createdAppUserId);
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
            <input name="appUserId" hidden defaultValue={appUser.id} readOnly />
            <TextField label="ユーザー名" defaultValue={appUser.name} name="appUserName"></TextField>
            <TextField label="メールアドレス" defaultValue={appUser.email} name="appUserEmail"></TextField>
            <TextField
              label="自己紹介文"
              multiline
              defaultValue={appUser.description}
              name="appUserDescription"
            ></TextField>
          </Stack>
          <Grid2 display="flex" justifyContent="center" m={5} container spacing={2}>
            <Button variant="contained" type="submit">
              保存
            </Button>
            <DeactivateButton appUserId={appUser.id} />
          </Grid2>
        </form>
      </Card>
    </>
  );
};

export default page;
