import { Prisma } from "@prisma/client";

export const prismaErrorHandler = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002") {
      return new Response("このデータはすでに存在しています", { status: 400 });
    }
    console.error("PrismaClientKnownRequestError:", e.code, e.message);
    return new Response(`${e.code}のエラーが発生しました。${e.message}`, { status: 400 });
  }

  if (e instanceof Prisma.PrismaClientValidationError) {
    return new Response("リクエストの入力値が正しくありません", { status: 400 });
  }

  if (e instanceof Prisma.PrismaClientInitializationError) {
    console.error("データベースの接続に失敗しました:", e);
    return new Response("現在サーバーが利用できません。後でもう一度試してください。", { status: 500 });
  }

  if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error("Prismaの未知のエラーが発生しました:", e);
    return new Response("予期しないエラーが発生しました。", { status: 500 });
  }

  console.error("Database Error:", e);
  return new Response("サーバーエラーが発生しました。", { status: 500 });
};
