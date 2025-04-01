import { Stack } from "@mui/material";
import { Episode } from "@prisma/client";
import Link from "next/link";

import { WideCard } from "@/app/components/WideCard";
import { getEpisodes } from "@/features/episodes/actions";

const EpisodesPage = async () => {
  const episodes = await getEpisodes();

  if (!episodes) {
    <p>エピソードがありません。</p>;
  }

  return (
    <>
      <Link href="/episodes/create">新規作成</Link>

      <Stack spacing={5} mx={4}>
        {episodes.map((episode: Episode) => (
          <WideCard key={episode.id} {...episode} />
        ))}
      </Stack>
    </>
  );
};

export default EpisodesPage;
