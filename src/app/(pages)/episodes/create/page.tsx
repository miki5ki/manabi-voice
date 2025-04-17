import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { getChannels } from "@/features/channels/actions";
import { createEpisode } from "@/features/episodes/actions";

const EpisodeCreatePage = async () => {
  const categories = await getCategories();
  const session = await getValidSession();
  const channels = await getChannels();
  return (
    <>
      <form action={createEpisode}>
        <input hidden name="appUserId" defaultValue={session.user.appUserId} />
        <input name="episodeTitle" type="text" />
        <input name="episodeDescription" type="text" />
        <select name="channelId">
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.title}
            </option>
          ))}
        </select>
        <select name="categoryId">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <button>保存</button>
      </form>
    </>
  );
};

export default EpisodeCreatePage;
