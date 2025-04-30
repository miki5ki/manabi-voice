"use client";

import { Button } from "@mui/material";
import { useState } from "react";

import { deactivateAppUser } from "@/features/users/actions";

type Props = {
  appUserId: string;
};

export const DeactivateButton = (props: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { appUserId } = props;

  const handleDeactivate = async () => {
    setIsProcessing(true);
    try {
      await deactivateAppUser(appUserId);
    } catch (error) {
      console.error("Error deactivating user", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button onClick={handleDeactivate} color="error" variant="outlined" disabled={isProcessing}>
      {isProcessing ? "処理中..." : "退会"}
    </Button>
  );
};
