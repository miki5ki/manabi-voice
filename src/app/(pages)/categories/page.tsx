import { Grid2 } from "@mui/material";

import { ViewAction } from "@/app/components/ViewAction";
import { ViewCard } from "@/app/components/ViewCard";
import { getCategories } from "@/features/categories/actions";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <ViewAction viewType="categories" />
      <Grid2 container spacing={2} m={3}>
        {categories.map((category) => (
          <ViewCard {...category} viewType="categories" key={category.id} />
        ))}
      </Grid2>
    </>
  );
};

export default CategoriesPage;
