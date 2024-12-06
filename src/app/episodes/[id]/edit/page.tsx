import { getCategories } from "@/features/categories/actions";
import { deleteEpisode, getEpisode, updateEpisode } from "@/features/episodes/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const EpisodeEditPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const episode = await getEpisode(id);
  const categories = await getCategories();
  if (!episode) {
    return <p>該当のエピソードが見つかりませんでした</p>;
  }

  return (
    <>
      <form method="POST" action={updateEpisode}>
        <input hidden name="episodeId" value={id} />
        <input hidden name="userId" defaultValue={"8167baf4-b514-4f8e-9a43-d81bf9a8a305"} />
        <input hidden name="audioId" defaultValue={"de85b69f-1264-4cb5-8b2b-56bea67c144b"} />
        <input name="episodeTitle" type="input" defaultValue={episode.title} />
        <input name="episodeContent" type="input" defaultValue={episode.content} />
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
