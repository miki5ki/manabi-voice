import { Theme } from "@emotion/react";
import { Button, Card, MenuItem, Stack, SxProps, TextField } from "@mui/material";

import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { createChannel } from "@/features/channels/actions";

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

const ChannelCreatePage = async () => {
  const categories = await getCategories();
  const session = await getValidSession();
  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <form action={createChannel}>
          <Stack m={3} spacing={3}>
            <input hidden name="appUserId" defaultValue={session.user.appUserId} readOnly />
            <TextField type="text" name="channelTitle" placeholder="チャンネルタイトル" required />
            <TextField type="text" name="channelDescription" placeholder="チャンネル詳細" />
            <TextField name="categoryId" select label="カテゴリー">
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
            <Button>作成</Button>
          </Stack>
        </form>
      </Card>
    </>
  );
};
export default ChannelCreatePage;
