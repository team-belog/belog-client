export type GoogleLoginRequest = {
  authorizationCode: string;
  redirectUri: string;
};

export type GoogleLoginData = {
  accessToken: string;
  expiresIn: number;
  onboardingRequired: boolean;
  socialProfileImageUrl: string;
};
