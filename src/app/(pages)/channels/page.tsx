import { Grid2 } from "@mui/material";

import { ViewAction } from "@/app/components/ViewAction";
import { ViewCard } from "@/app/components/ViewCard";
import { getChannels } from "@/features/channels/actions";

const ChannelsPage = async () => {
  const channels = await getChannels();

  return (
    <>
      <ViewAction viewType="channels" />

      <Grid2 container spacing={2} m={3}>
        {channels.map((channel) => (
          <ViewCard {...channel} viewType="channels" key={channel.id} />
        ))}
      </Grid2>
    </>
  );
};

export default ChannelsPage;
