import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid2, Typography } from "@mui/material";

import { CategoryCardProps } from "../(pages)/categories/types/categoriesTypes";
import { ChannelCardProps } from "../(pages)/channels/types/categoriesTypes";

export const ViewCard = (props: CategoryCardProps | ChannelCardProps) => {
  const { id, title, description, viewType } = props;
  return (
    <>
      <Grid2 size={{ lg: 3, md: 4, xs: 6 }}>
        <Card>
          <CardActionArea href={`${viewType}/${id}`}>
            <CardHeader title={title} />
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
