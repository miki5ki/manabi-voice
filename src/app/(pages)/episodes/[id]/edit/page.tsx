import { Button, Card, Grid2, MenuItem, Stack, SxProps, TextField, Theme } from "@mui/material";
import { notFound } from "next/navigation";

import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { getCategoriesByEpisode } from "@/features/categories/relations/actions";
import { deleteEpisode, getEpisode, updateEpisode } from "@/features/episodes/actions";
import { assertIsOwner } from "@/lib/permission";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

const EpisodeEditPage = async (props: Props) => {
  const session = await getValidSession();
  const { params } = props;
  const { id } = params;
  const episode = await getEpisode(id);
  const categories = await getCategories();
  const selectedCategory = await getCategoriesByEpisode(id);
  if (!episode || !categories.length || !selectedCategory) notFound();
  assertIsOwner(session.user.appUserId, episode.appUserId);

  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <form action={updateEpisode}>
          <Stack m={3} spacing={3}>
            <input hidden name="episodeId" value={id} readOnly />
            <input hidden name="loginAppUserId" value={session.user.appUserId} readOnly />
            <input hidden name="createdAppUserId" value={episode.appUserId} readOnly />
            <input hidden name="audioId" value={episode.audioId} readOnly />
            <input hidden name="channelId" value={episode.channelId} readOnly />
            <TextField name="episodeTitle" defaultValue={episode.title} label="タイトル" />
            <TextField
              name="episodeDescription"
              type="input"
              defaultValue={episode.description}
              label="詳細"
              multiline
            />
            <TextField select name="categoryId" label="カテゴリー" defaultValue={selectedCategory.categoryId}>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Grid2 display="flex" justifyContent="center" m={5} container spacing={2}>
            <Grid2>
              <Button variant="contained" type="submit" formAction={updateEpisode}>
                保存
              </Button>
            </Grid2>
            <Grid2>
              <Button type="submit" formAction={deleteEpisode}>
                削除
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </>
  );
};

export default EpisodeEditPage;
