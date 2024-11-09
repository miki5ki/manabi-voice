import { createEpisode } from "@/features/episodes/actions";

const EpisodeCreatePage = () => {
  return (
    <>
      <form method="POST" action={createEpisode}>
        <input hidden name="userId" defaultValue="2ce7c376-6167-4256-8eb2-c2d47287c222" />
        <input hidden name="audioId" defaultValue="e2d65f0f-42cf-41b5-a961-01cfa1b28dda" />
        <input name="episodeTitle" type="text" />
        <input name="episodeContent" type="text" />
        <button>保存</button>
      </form>
    </>
  );
};

export default EpisodeCreatePage;
