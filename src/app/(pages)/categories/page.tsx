import { Grid2 } from "@mui/material";
import { notFound } from "next/navigation";

import { ViewAction } from "@/app/components/ViewAction";
import { ViewCard } from "@/app/components/ViewCard";
import { getCategories } from "@/features/categories/actions";

const CategoriesPage = async ({ searchParams }: { searchParams: { keyWord?: string } }) => {
  const keyWord = searchParams.keyWord ?? "";
  const categories = await getCategories({ keyWord: keyWord });

  if (!categories) notFound();

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
