import { Channel } from "@prisma/client";

export type ChannelCardProps = Channel & {
  viewType: "channels";
};
