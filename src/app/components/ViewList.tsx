import { Avatar, Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material";
import { Episode } from "@prisma/client";

import { SoundPlayer } from "./SoundPlayer";

export const ViewList = (props: Episode) => {
  const { title, content } = props;

  return (
    <Card sx={cardStyle}>
      <CardHeader
        avatar={
          <Avatar
            sx={avatarStyle}
            aria-label="recipe"
            src="https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg"
          />
        }
        sx={cardHeaderStyle}
      />
      <CardContent sx={cardContentStyle}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="body1" sx={typographyStyle}>
          {content}
        </Typography>
        <SoundPlayer />
      </CardContent>
    </Card>
  );
};

const cardStyle: SxProps<Theme> = {
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
};

const cardHeaderStyle: SxProps<Theme> = {
  flex: "0 0 auto",
};

const avatarStyle: SxProps<Theme> = {
  height: { sm: 80, xs: 60 },
  marginLeft: "10px",
  width: { sm: 80, xs: 60 },
};

const cardContentStyle: SxProps<Theme> = {
  flex: 1,
};

const typographyStyle: SxProps<Theme> = {
  color: "text.secondary",
};
