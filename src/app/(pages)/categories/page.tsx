import { Search } from "@mui/icons-material";
import { Button, Grid2, InputAdornment, TextField } from "@mui/material";

import { getCategories } from "@/features/categories/actions";

import { CategoryCard } from "./components/CategoryCard";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <Grid2 container spacing={1} m={3}>
        <TextField
          variant="standard"
          color="secondary"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button variant="outlined" color="secondary">
          検索
        </Button>

        <Button variant="contained" color="primary" href={"/categories/create"}>
          新規作成
        </Button>
      </Grid2>

      <Grid2 container spacing={2} m={3}>
        {categories.map((category) => (
          <CategoryCard {...category} key={category.id} />
        ))}
      </Grid2>
    </>
  );
};

export default CategoriesPage;
