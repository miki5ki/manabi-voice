import { Grid2 } from "@mui/material";
import Link from "next/link";

import { getCategories } from "@/features/categories/actions";

import { CategoryCard } from "./components/CategoryCard";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <Link href={"/categories/create"}>新規作成</Link>
      <Grid2 container spacing={2}>
        {categories.map((category) => (
          <CategoryCard {...category} key={category.id} />
        ))}
      </Grid2>
    </>
  );
};

export default CategoriesPage;
