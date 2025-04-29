import { Button, Card, MenuItem, Stack, SxProps, TextField, Theme } from "@mui/material";

import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { getChannels } from "@/features/channels/actions";
import { createEpisode } from "@/features/episodes/actions";

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

const EpisodeCreatePage = async () => {
  const categories = await getCategories();
  const session = await getValidSession();
  const channels = await getChannels();
  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <form action={createEpisode}>
          <Stack m={3} spacing={3}>
            <input hidden name="appUserId" defaultValue={session.user.appUserId} readOnly />
            <TextField name="episodeTitle" type="text" label="タイトル" />
            <TextField name="episodeDescription" type="text" label="詳細" />
            <TextField name="channelId" select label="チャンネル">
              {channels.map((channel) => (
                <MenuItem key={channel.id} value={channel.id}>
                  {channel.title}
                </MenuItem>
              ))}
            </TextField>
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

export default EpisodeCreatePage;
