import { Grid2 } from "@mui/material";
import { notFound } from "next/navigation";

import { ViewAction } from "@/app/components/ViewAction";
import { ViewCard } from "@/app/components/ViewCard";
import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { hasPermission } from "@/lib/permission";

const CategoriesPage = async ({ searchParams }: { searchParams: { keyWord?: string } }) => {
  const keyWord = searchParams.keyWord ?? "";
  const categories = await getCategories({ keyWord: keyWord });
  const session = await getValidSession();
  const creatable = hasPermission(session.user.appUserRole, "category:create");

  if (!categories) notFound();

  return (
    <>
      <ViewAction viewType="categories" creatable={creatable} />
      <Grid2 container spacing={2} m={3}>
        {categories.map((category) => (
          <ViewCard {...category} viewType="categories" key={category.id} />
        ))}
      </Grid2>
    </>
  );
};

export default CategoriesPage;
