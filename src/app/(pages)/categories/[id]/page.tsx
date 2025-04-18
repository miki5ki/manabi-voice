import { Grid2, Typography } from "@mui/material";
import { notFound } from "next/navigation";

import { ViewCard } from "@/app/components/ViewCard";
import { getCategory } from "@/features/categories/actions";
import { getChannelsByCategory, getEpisodesByCategory } from "@/features/categories/relations/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};

const CategoryShowPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const category = await getCategory(id);
  if (!category) notFound();
  const channels = await getChannelsByCategory(id);
  const episodes = await getEpisodesByCategory(id);
  return (
    <>
      <Typography variant="h4" m={3}>
        {category.title}
      </Typography>
      <Typography m={3} variant="h6">
        チャンネル
      </Typography>
      <Grid2 container spacing={2} m={3}>
        {channels.map((channel) => (
          <ViewCard {...channel} viewType="channels" key={channel.id} />
        ))}
      </Grid2>
      <Typography m={3} variant="h6">
        エピソード
      </Typography>
      <Grid2 container spacing={2} m={3}>
        {episodes.map((episode) => (
          <ViewCard {...episode} viewType="episodes" key={episode.id} />
        ))}
      </Grid2>
    </>
  );
};

export default CategoryShowPage;
