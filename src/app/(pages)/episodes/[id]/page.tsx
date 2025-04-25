import { AccountCircle } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WideCard } from "@/app/components/WideCard";
import { getValidSession } from "@/features/auth/actions";
import { CreateComment, getComments } from "@/features/comments/actions";
import { getEpisode } from "@/features/episodes/actions";
import { isOwner } from "@/lib/permission";

const buttonStyles: SxProps<Theme> = {
  width: "80%",
};

const StackStyle: SxProps<Theme> = {
  alignItems: "center",
  flexDirection: "row",
  gap: 1,
};

const commentTextStyle: SxProps<Theme> = {
  mx: 1,
};

const commentFormStyle = {
  alignItems: "center",
  display: "flex",
  gap: "8px",
};

const linkStyle = {
  textDecoration: "none",
};

type Props = {
  params: {
    id: string;
  };
};
const EpisodeShowPage = async (props: Props) => {
  const session = await getValidSession();
  const { params } = props;
  const { id } = params;
  const episode = await getEpisode(id);
  const comments = await getComments(id);
  if (!episode || !comments) notFound();

  return (
    <>
      <Box m={4}>
        {isOwner(session.user.appUserId, episode.appUserId) ? (
          <Link href={`/episodes/${episode.id}/edit`} passHref style={linkStyle}>
            <WideCard key={episode.id} {...episode} />
          </Link>
        ) : (
          <WideCard {...episode} />
        )}
        <Typography my={3} variant="h6">
          コメント
        </Typography>
        <Stack sx={StackStyle}>
          <IconButton color="inherit" size="large">
            <AccountCircle />
          </IconButton>
          <form action={CreateComment} style={commentFormStyle}>
            <input type="hidden" value={id} name="episodeId" />
            <input hidden name="appUserId" defaultValue={session.user.appUserId} />
            <TextField
              label="コメント"
              variant="outlined"
              id="description"
              size="small"
              sx={{ minWidth: 400 }}
              name="description"
            />
            <Button variant="contained" sx={buttonStyles} type="submit">
              投稿
            </Button>
          </form>
        </Stack>
        <Stack spacing={2}>
          {comments &&
            comments.map((comment) => (
              <Stack key={comment.id} sx={StackStyle}>
                <IconButton color="inherit" size="large">
                  <AccountCircle />
                </IconButton>
                <Stack>
                  <Typography variant="caption">{comment.user.name}</Typography>
                  <Typography variant="caption">{comment.createdAtFormatted}</Typography>
                </Stack>
                <Typography sx={commentTextStyle}>{comment.description}</Typography>
              </Stack>
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default EpisodeShowPage;
