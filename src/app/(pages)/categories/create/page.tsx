import { Button, Card, Grid2, Stack, SxProps, TextField, Theme } from "@mui/material";

import { getValidSession } from "@/features/auth/actions";
import { createCategory } from "@/features/categories/actions";
import { assertHasPermission } from "@/lib/permission";

const cardStyle: SxProps<Theme> = {
  maxWidth: 480,
  mt: 5,
  mx: "auto",
  width: "100%",
};

const CategoryCreatePage = async () => {
  const appUser = await getValidSession();
  assertHasPermission(appUser.user.appUserRole, "category:create");

  return (
    <>
      <Card variant="outlined" sx={cardStyle}>
        <Stack m={3}>
          <form action={createCategory}>
            <TextField type="text" label="タイトル" name="categoryTitle" required fullWidth />
            <Grid2 justifyContent="center" mt={3} container>
              <Button variant="contained" type="submit">
                保存
              </Button>
            </Grid2>
          </form>
        </Stack>
      </Card>
    </>
  );
};

export default CategoryCreatePage;
