"use client";

import { useState } from "react";

import { deactivateUser } from "@/features/users/actions";

type Props = {
  deactivateInfo: {
    loginUserId: string;
    loginUserRole: string;
    userProfileId: string;
  };
};

export const DeactivateButton = (props: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { deactivateInfo } = props;

  const handleDeactivate = async () => {
    setIsProcessing(true);
    try {
      await deactivateUser({
        loginUserId: deactivateInfo.loginUserId, // ログインユーザーID
        loginUserRole: deactivateInfo.loginUserRole, // ログインユーザーのロール
        userProfileId: deactivateInfo.userProfileId, // 退会処理対象ユーザーID
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
