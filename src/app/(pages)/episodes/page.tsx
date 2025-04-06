import { Stack } from "@mui/material";
import { Episode } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WideCard } from "@/app/components/WideCard";
import { getEpisodes } from "@/features/episodes/actions";

const linkStyle = {
  textDecoration: "none",
};

const EpisodesPage = async () => {
  const episodes = await getEpisodes();

  if (!episodes) notFound();

  return (
    <>
      <Link href="/episodes/create">新規作成</Link>

      <Stack spacing={5} mx={4}>
        {episodes.map((episode: Episode) => (
          <Link key={episode.id} href={`/episodes/${episode.id}`} passHref style={linkStyle}>
            <WideCard {...episode} />
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default EpisodesPage;
