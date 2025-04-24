export const isOwner = (loginAppUserId: string, createdAppUserId: string): boolean => {
  return loginAppUserId === createdAppUserId;
};

export const assertIsOwner = (loginAppUserId: string, createdAppUserId: string): void => {
  if (!isOwner(loginAppUserId, createdAppUserId)) {
    throw new Error("このエピソードの作成者ではないため操作できません。");
  }
};
