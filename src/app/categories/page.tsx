import Link from "next/link";

import { getCategories } from "@/features/categories/actions";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <Link href={"/categories/create"}>新規作成</Link>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <>
              <tr key={category.id}>
                <td>{category.title}</td>
                <td>
                  <Link href={`/categories/${category.id}/edit`}>編集</Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CategoriesPage;
