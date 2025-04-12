"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { HttpError } from "@/lib/http-error";

const ErrorPage = ({ error }: { error: HttpError }) => {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h1">エラーが発生しました</Typography>
      <Typography variant="h6">データベース接続エラーが発生しました。</Typography>
      <Typography variant="h6">
        {error.message} (ステータス: {error.status})
      </Typography>
      <Button onClick={() => router.push("/")}>ホームへ戻る</Button>
    </Box>
  );
};

export default ErrorPage;
