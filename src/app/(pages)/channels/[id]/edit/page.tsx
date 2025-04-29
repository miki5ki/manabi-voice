import { Button, Card, Grid2, MenuItem, Stack, SxProps, TextField, Theme } from "@mui/material";
import { Category } from "@prisma/client";
import { notFound } from "next/navigation";

import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { getCategoriesByChannel } from "@/features/categories/relations/actions";
import { deleteChannel, getChannel, updateChannel } from "@/features/channels/actions";
import { assertHasPermission, assertIsOwner } from "@/lib/permission";

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

const ChannelEditPage = async (props: Props) => {
  const session = await getValidSession();
  const { params } = props;
  const { id } = params;
  const channel = await getChannel(id);
  const categories = await getCategories();
  const selectedCategory = await getCategoriesByChannel(id);
  if (!channel || !categories || !selectedCategory) notFound();
  assertHasPermission(session.user.appUserRole, "channel:update");
  assertIsOwner(session.user.appUserId, channel.appUserId);

  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <form>
          <Stack m={3} spacing={3}>
            <input type="hidden" name="channelId" value={channel.id} readOnly />
            <input hidden name="createdAppUserId" value={channel.appUserId} readOnly />
            <TextField type="text" name="channelTitle" defaultValue={channel.title} required label="タイトル" />
            <TextField
              type="text"
              name="channelDescription"
              defaultValue={channel.description ?? ""}
              label="詳細"
              multiline
            />
            <TextField name="categoryId" label="カテゴリー" select defaultValue={selectedCategory.categoryId}>
              {categories.map((category: Category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Grid2 display="flex" justifyContent="center" m={5} container spacing={2}>
            <Grid2>
              <Button variant="contained" type="submit" formAction={updateChannel}>
                保存
              </Button>
            </Grid2>
            <Grid2>
              <Button type="submit" formAction={deleteChannel} color="error">
                削除
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </>
  );
};

export default ChannelEditPage;
