export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  group: {
    list: "/groups",
    create: "/groups",
  },
} as const;
