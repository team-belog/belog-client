export const notificationKeys = {
  all: ["notifications"] as const,
  list: () => [...notificationKeys.all, "list"] as const,
  settings: () => [...notificationKeys.all, "settings"] as const,
};
