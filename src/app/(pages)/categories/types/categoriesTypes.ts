import { Category } from "@prisma/client";

export type CategoryCardProps = Category & {
  viewType: "categories";
};
