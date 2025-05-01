import { Grid2 } from "@mui/material";

import { ViewAction } from "@/app/components/ViewAction";
import { ViewCard } from "@/app/components/ViewCard";
import { getValidSession } from "@/features/auth/actions";
import { getChannels } from "@/features/channels/actions";
import { hasPermission } from "@/lib/permission";

const ChannelsPage = async ({ searchParams }: { searchParams: { keyWord: string } }) => {
  const keyWord = searchParams.keyWord ?? "";
  const channels = await getChannels({ keyWord: keyWord });
  const session = await getValidSession();
  const creatable = hasPermission(session.user.appUserRole, "channel:create");

  return (
    <>
      <ViewAction viewType="channels" creatable={creatable} />
      <Grid2 container spacing={2} m={3}>
        {channels.map((channel) => (
          <ViewCard {...channel} viewType="channels" key={channel.id} />
        ))}
      </Grid2>
    </>
  );
};

export default ChannelsPage;
