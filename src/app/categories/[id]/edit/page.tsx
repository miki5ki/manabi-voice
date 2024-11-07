import { getCategory } from "@/features/categories/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const CategoryEditPage = (props: Props) => {
  const { params } = props;
  const { id } = params;

  const category = getCategory(id);

  return (
    <>
      <form>
        <input defaultValue={category.title} />
      </form>
    </>
  );
};

export default CategoryEditPage;
