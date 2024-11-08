import { deleteCategory, getCategory, updateCategory } from "@/features/categories/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const CategoryEditPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;

  const category = await getCategory(id);

  return (
    <>
      <form method="POST">
        <input type="hidden" name="categoryId" value={id} />
        <input defaultValue={category.title} name="categoryTitle" />
        <button formAction={updateCategory}>保存</button>
        <button formAction={deleteCategory}>削除</button>
      </form>
    </>
  );
};

export default CategoryEditPage;
