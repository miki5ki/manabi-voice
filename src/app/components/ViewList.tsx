import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Episode } from "@prisma/client";

import { SoundPlayer } from "./SoundPlayer";

export const ViewList = (props: Episode) => {
  const { title, content } = props;

  return (
    <Card sx={{ alignItems: "center", display: "flex", flexDirection: "row" }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ height: { sm: 80, xs: 60 }, marginLeft: "10px", width: { sm: 80, xs: 60 } }}
            aria-label="recipe"
            src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg"
          />
        }
        sx={{ flex: "0 0 auto" }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {content}
        </Typography>
        <SoundPlayer />
      </CardContent>
    </Card>
  );
};

//マージン調整と再生バーの調整は完了したのであとは微修正したらOK
