import { Button, Grid2, Link, Typography } from "@mui/material";
import { notFound } from "next/navigation";

import { ViewCard } from "@/app/components/ViewCard";
import { getValidSession } from "@/features/auth/actions";
import { getCategory } from "@/features/categories/actions";
import { getChannelsByCategory, getEpisodesByCategory } from "@/features/categories/relations/actions";
import { hasPermission } from "@/lib/permission";

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
  const session = await getValidSession();
  const editable = hasPermission(session.user.appUserRole, "category:update");
  return (
    <>
      <Typography variant="h4" m={3}>
        {category.title}
      </Typography>
      {editable && (
        <Grid2
          mr={4}
          container
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Link href={`/categories/${category.id}/edit`}>
            <Button color="secondary" variant="outlined">
              編集
            </Button>
          </Link>
        </Grid2>
      )}
      <Typography m={3} variant="h6">
        チャンネル
      </Typography>
      <Grid2 container spacing={2} m={3}>
        {channels && channels.map((channel) => <ViewCard {...channel} viewType="channels" key={channel.id} />)}
      </Grid2>
      <Typography m={3} variant="h6">
        エピソード
      </Typography>
      <Grid2 container spacing={2} m={3}>
        {episodes && episodes.map((episode) => <ViewCard {...episode} viewType="episodes" key={episode.id} />)}
      </Grid2>
    </>
  );
};

export default CategoryShowPage;
