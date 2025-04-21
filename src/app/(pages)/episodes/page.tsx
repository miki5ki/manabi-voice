import { Stack } from "@mui/material";
import { Episode } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ViewAction } from "@/app/components/ViewAction";
import { WideCard } from "@/app/components/WideCard";
import { getEpisodes } from "@/features/episodes/actions";

const linkStyle = {
  textDecoration: "none",
};

const EpisodesPage = async ({ searchParams }: { searchParams: { keyWord?: string } }) => {
  const keyWord = searchParams.keyWord ?? "";
  const episodes = await getEpisodes({ keyWord: keyWord });

  if (!episodes) notFound();

  return (
    <>
      <ViewAction viewType="episodes" />
      <Stack spacing={5} mx={3}>
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
