import { Button, Card, Grid2, Stack, SxProps, TextField, Theme } from "@mui/material";
import { notFound } from "next/navigation";

import { getValidSession } from "@/features/auth/actions";
import { deleteCategory, getCategory, updateCategory } from "@/features/categories/actions";
import { assertHasPermission } from "@/lib/permission";

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

const CategoryEditPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;

  const category = await getCategory(id);
  if (!category) notFound();
  const appUser = await getValidSession();
  assertHasPermission(appUser.user.appUserRole, "category:update");

  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <Stack m={3}>
          <form>
            <input type="hidden" name="categoryId" value={id} readOnly />
            <TextField
              type="text"
              label="タイトル"
              name="categoryTitle"
              required
              fullWidth
              defaultValue={category.title}
            />
            <Grid2 display="flex" justifyContent="center" mt={3} container>
              <Grid2>
                <Button variant="contained" type="submit" formAction={updateCategory}>
                  保存
                </Button>
              </Grid2>
              <Grid2>
                <Button type="submit" formAction={deleteCategory} color="error">
                  削除
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Stack>
      </Card>
    </>
  );
};

export default CategoryEditPage;
