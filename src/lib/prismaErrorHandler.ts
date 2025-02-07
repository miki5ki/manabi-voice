import { Prisma } from "@prisma/client";

import { HttpError } from "./http-error";

export const prismaErrorHandler = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      throw new HttpError(409, `エラーコード：${e.code} 「${e.meta?.target}」はすでにデータベースに登録されています`);
    }
    console.error("PrismaClientKnownRequestError:", e.code, e.message);
    throw new HttpError(400, `エラーコード：${e.code} このデータはデータベースの制約条件に該当しています`);
  }

  if (e instanceof Prisma.PrismaClientValidationError) {
    console.error("PrismaClientValidationError", e.message);
    throw new HttpError(400, "バリデーションに失敗しました");
  }

  if (e instanceof Prisma.PrismaClientInitializationError) {
    console.error("PrismaClientInitializationError", e);
    throw new HttpError(500, "データベースの接続に失敗しました。しばらく経ってから再度お試しください");
  }

  if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error("PrismaClientUnknownRequestError", e);
    throw new HttpError(500, "予期せぬエラーが発生しました");
  }

  console.error("Database Error:", e instanceof Error ? e.stack : e);
  throw new HttpError(500, "予期せぬエラーが発生しました");
};
