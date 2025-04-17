import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { createChannel } from "@/features/channels/actions";

const ChannelCreatePage = async () => {
  const categories = await getCategories();
  const session = await getValidSession();
  return (
    <>
      <form action={createChannel}>
        <input hidden name="appUserId" defaultValue={session.user.appUserId} />
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
