import { Category } from "@prisma/client";
import { notFound } from "next/navigation";

import { getCategories } from "@/features/categories/actions";
import { deleteChannel, getChannel, updateChannel } from "@/features/channels/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};
const ChannelEditPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const channel = await getChannel(id);
  const categories = await getCategories();
  if (!channel || !categories) notFound();

  return (
    <>
      <form method="POST">
        <input type="hidden" name="channelId" value={channel.id} />
        <input type="text" name="channelTitle" defaultValue={channel.title} required />
        <input type="text" name="channelDescription" defaultValue={channel.description ?? ""} />
        <select name="categoryId">
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <button formAction={updateChannel}>保存</button>
        <button formAction={deleteChannel}>削除</button>
      </form>
    </>
  );
};

export default ChannelEditPage;
