import { notFound } from "next/navigation";

import { getValidSession } from "@/features/auth/actions";
import { getCategories } from "@/features/categories/actions";
import { deleteEpisode, getEpisode, updateEpisode } from "@/features/episodes/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const EpisodeEditPage = async (props: Props) => {
  const session = await getValidSession();
  const { params } = props;
  const { id } = params;
  const episode = await getEpisode(id);
  const categories = await getCategories();
  if (!episode) notFound();

  return (
    <>
      <form method="POST" action={updateEpisode}>
        <input hidden name="episodeId" value={id} />
        <input hidden name="appUserId" defaultValue={session.user.appUserId} />
        <input name="episodeTitle" type="input" defaultValue={episode.title} />
        <input name="episodeDescription" type="input" defaultValue={episode.description} />
        <select name="categoryId">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <button formAction={updateEpisode}>保存</button>
        <button formAction={deleteEpisode}>削除</button>
      </form>
    </>
  );
};

export default EpisodeEditPage;
