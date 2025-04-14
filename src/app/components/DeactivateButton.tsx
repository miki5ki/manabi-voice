"use client";

import { useState } from "react";

import { deactivateAppUser } from "@/features/users/actions";

type Props = {
  deactivateInfo: {
    appUserId: string;
    loginUserId: string;
    loginUserRole: string;
  };
};

export const DeactivateButton = (props: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { deactivateInfo } = props;

  const handleDeactivate = async () => {
    setIsProcessing(true);
    try {
      await deactivateAppUser({
        loginUserId: deactivateInfo.loginUserId, // ログインユーザーID
        loginUserRole: deactivateInfo.loginUserRole, // ログインユーザーのロール
        userProfileId: deactivateInfo.appUserId, // 退会処理対象ユーザーID
      });
    } catch (error) {
      console.error("Error deactivating user", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={handleDeactivate} disabled={isProcessing}>
      {isProcessing ? "処理中..." : "退会"}
    </button>
  );
};
