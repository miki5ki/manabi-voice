import { Card, CardActionArea, CardContent, CardMedia, Grid2, Typography } from "@mui/material";

import { CategoryCardProps } from "../(pages)/categories/types/categoriesTypes";
import { ChannelCardProps } from "../(pages)/channels/types/categoriesTypes";
import { EpisodeCardProps } from "../(pages)/episodes/types/categoryTypes";

export const ViewCard = (props: CategoryCardProps | ChannelCardProps | EpisodeCardProps) => {
  const { id, title, description, viewType } = props;
  return (
    <>
      <Grid2 size={{ lg: 3, md: 4, xs: 6 }}>
        <Card sx={{ height: "100%" }}>
          <CardActionArea href={`${viewType}/${id}`}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={"bold"}>
                {title}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              alt={`${viewType}の画像`}
              image="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg"
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", minHeight: "80px" }}>
              <Typography>{description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid2>
    </>
  );
};
