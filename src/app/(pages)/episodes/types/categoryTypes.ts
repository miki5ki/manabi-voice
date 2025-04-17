import { Episode } from "@prisma/client";

export type EpisodeCardProps = Episode & {
  viewType: "episodes";
};
