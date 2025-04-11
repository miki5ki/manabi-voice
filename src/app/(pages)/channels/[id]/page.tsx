import { Box, Stack, Typography } from "@mui/material";
import { Episode } from "@prisma/client";
import { notFound } from "next/navigation";

import { WideCard } from "@/app/components/WideCard";
import { getChannel } from "@/features/channels/actions";
import { getEpisodes } from "@/features/episodes/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const ChannelShowPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const channel = await getChannel(id);
  const episodes = await getEpisodes();
  if (!channel) notFound();

  return (
    <>
      <Box>
        <Typography variant="h4">{channel.title}</Typography>
        <Typography variant="subtitle1">{channel.description}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">エピソード一覧</Typography>
        <Stack spacing={5} mx={4}>
          {episodes.map((episode: Episode) => (
            <WideCard key={episode.id} {...episode} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default ChannelShowPage;
