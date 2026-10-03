export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  group: {
    list: "/groups",
    create: "/groups",
    coverImageUploadUrl: "/groups/cover-image/upload-url",
  },
} as const;
