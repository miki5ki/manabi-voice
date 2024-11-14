import { createCategory } from "@/features/categories/actions";

const CategoryCreatePage = () => {
  return (
    <>
      <form method="POST" action={createCategory}>
        <input name="categoryTitle" required />
        <button>保存</button>
      </form>
    </>
  );
};

export default CategoryCreatePage;
