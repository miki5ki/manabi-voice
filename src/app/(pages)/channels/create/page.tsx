import { getCategories } from "@/features/categories/actions";
import { createChannel } from "@/features/channels/actions";

const ChannelCreatePage = async () => {
  const categories = await getCategories();
  return (
    <>
      <form action={createChannel}>
        <input type="text" name="channelTitle" placeholder="チャンネルタイトル" required />
        <input type="text" name="channelDescription" placeholder="チャンネル詳細" />
        <select name="categoryId">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <button>作成</button>
      </form>
    </>
  );
};

export default ChannelCreatePage;
