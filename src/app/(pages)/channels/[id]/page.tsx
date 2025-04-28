import { Avatar, Box, Button, Grid2, Stack, SxProps, Theme, Typography } from "@mui/material";
import { Episode } from "@prisma/client";
import Link from "next/link";
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

const avatarStyle: SxProps<Theme> = {
  height: { sm: 160, xs: 120 },
  marginLeft: "10px",
  width: { sm: 160, xs: 120 },
};

const gridStyle: SxProps<Theme> = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  margin: 3,
};

const linkStyle = {
  textDecoration: "none",
};

const ChannelShowPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const channel = await getChannel(id);
  if (!channel) notFound();
  const episodes = await getEpisodes({ channelId: id });
  return (
    <>
      <Grid2 sx={gridStyle}>
        <Avatar
          sx={avatarStyle}
          aria-label="recipe"
          src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg"
        />
        <Grid2 m={3}>
          <Typography variant="h4">{channel.title}</Typography>
          <Typography variant="subtitle1">{channel.description}</Typography>
        </Grid2>
      </Grid2>
      <Grid2
        mr={4}
        container
        sx={{
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Link href={`/channels/${channel.id}/edit`}>
          <Button color="secondary" variant="outlined">
            編集
          </Button>
        </Link>
      </Grid2>

      <Box my={3}>
        <Typography variant="h6" my={3} mx={4}>
          エピソード一覧
        </Typography>
        <Stack spacing={5} mx={4}>
          {episodes ? (
            episodes.map((episode: Episode) => (
              <Link key={episode.id} href={`/episodes/${episode.id}`} passHref style={linkStyle}>
                <WideCard {...episode} />
              </Link>
            ))
          ) : (
            <Box>
              <Typography variant="h6">関連するエピソードはありません</Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default ChannelShowPage;
