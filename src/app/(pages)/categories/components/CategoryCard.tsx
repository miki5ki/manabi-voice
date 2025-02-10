import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid2, Typography } from "@mui/material";
import { Category } from "@prisma/client";

export const CategoryCard = (props: Category) => {
  const { id, title, description } = props;
  return (
    <>
      <Grid2 size={{ lg: 3, md: 4, xs: 6 }}>
        <Card>
          <CardActionArea href={`categories/${id}`}>
            <CardHeader title={title} />
            <CardMedia
              component="img"
              alt="カテゴリーの画像"
              image="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg"
            />
            <CardContent>
              <Typography>{description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid2>
    </>
  );
};
