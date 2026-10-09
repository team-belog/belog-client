export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  user: {
    onboarding: "/users/me/onboarding",
    profileImageUploadUrl: "/users/me/profile-image/upload-url",
    nicknameAvailability: "/users/nickname/availability",
  },
} as const;
