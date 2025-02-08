import { z } from "zod";

export const validateSchema = <T>(schema: z.Schema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error("入力データが正しくありません");
  }
  return result.data;
};
