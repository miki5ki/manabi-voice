type Role = "admin" | "host" | "user";

type Permission =
  | "category:create"
  | "category:read"
  | "category:update"
  | "category:delete"
  | "channel:create"
  | "channel:read"
  | "channel:update"
  | "channel:delete"
  | "episode:create"
  | "episode:read"
  | "episode:update"
  | "episode:delete"
  | "user:read"
  | "user:deactivate";

export const isOwner = (loginAppUserId: string, createdAppUserId: string): boolean => {
  return loginAppUserId === createdAppUserId;
};

export const assertIsOwner = (loginAppUserId: string, createdAppUserId: string): void => {
  if (!isOwner(loginAppUserId, createdAppUserId)) {
    throw new Error("このエピソードの作成者ではないため操作できません。");
  }
};

const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "category:create",
    "category:read",
    "category:update",
    "category:delete",
    "channel:create",
    "channel:read",
    "channel:update",
    "channel:delete",
    "episode:create",
    "episode:read",
    "episode:update",
    "episode:delete",
    "user:read",
    "user:deactivate",
  ],
  host: [
    "channel:create",
    "channel:read",
    "channel:update",
    "channel:delete",
    "episode:create",
    "episode:read",
    "episode:update",
    "episode:delete",
  ],
  user: [],
};

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return rolePermissions[role].includes(permission);
};

export const assertHasPermission = (role: Role, permission: Permission) => {
  if (!hasPermission(role, permission)) {
    throw new Error("このデータを操作する権限がありません");
  }
};
