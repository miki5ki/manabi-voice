import { Episode } from "@prisma/client";
import Link from "next/link";

import { getEpisodes } from "@/features/episodes/actions";

const EpisodesPage = async () => {
  const episodes = await getEpisodes();

  if (!episodes) {
    <p>エピソードがありません。</p>;
  }

  return (
    <>
      <Link href="/episodes/create">新規作成</Link>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode: Episode) => (
            <>
              <tr key={episode.id}>
                <td>{episode.title}</td>
                <td>{episode.content}</td>
                <td>
                  <Link href={`/episodes/${episode.id}/edit`}>編集</Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EpisodesPage;
