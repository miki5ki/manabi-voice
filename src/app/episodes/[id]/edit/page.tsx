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

  if (!episode) {
    return <p>該当のエピソードが見つかりませんでした</p>;
  }

  return (
    <>
      <form method="POST" action={updateEpisode}>
        <input hidden name="episodeId" value={id} />
        <input hidden name="userId" defaultValue={"2ce7c376-6167-4256-8eb2-c2d47287c222"} />
        <input hidden name="audioId" defaultValue={"fe9cafb9-1a38-49d9-b379-373229aa397b"} />
        <input name="episodeTitle" type="input" defaultValue={episode.title} />
        <input name="episodeContent" type="input" defaultValue={episode.content} />
        <button formAction={updateEpisode}>保存</button>
        <button formAction={deleteEpisode}>削除</button>
      </form>
    </>
  );
};

export default EpisodeEditPage;
