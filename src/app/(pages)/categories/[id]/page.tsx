import { Grid2 } from "@mui/material";

import { ViewCard } from "@/app/components/ViewCard";
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

  const channels = await getChannelsByCategory(id);
  const episodes = await getEpisodesByCategory(id);
  return (
    <>
      <div>
        <Grid2 container spacing={2} m={3}>
          {channels.map((channel) => (
            <ViewCard {...channel} viewType="channels" key={channel.id} />
          ))}
        </Grid2>
      </div>
      <div>
        <Grid2 container spacing={2} m={3}>
          {episodes.map((episode) => (
            <ViewCard {...episode} viewType="episodes" key={episode.id} />
          ))}
        </Grid2>
      </div>
    </>
  );
};

export default CategoryShowPage;
