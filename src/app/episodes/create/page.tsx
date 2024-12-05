import { getCategories } from "@/features/categories/actions";
import { createEpisode } from "@/features/episodes/actions";

const EpisodeCreatePage = async () => {
  const categories = await getCategories();
  return (
    <>
      <form method="POST" action={createEpisode}>
        <input hidden name="userId" defaultValue="8167baf4-b514-4f8e-9a43-d81bf9a8a305" />
        <input hidden name="audioId" defaultValue="de85b69f-1264-4cb5-8b2b-56bea67c144b" />
        <input name="episodeTitle" type="text" />
        <input name="episodeContent" type="text" />
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
