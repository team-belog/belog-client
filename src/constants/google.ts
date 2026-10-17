const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const GOOGLE_REDIRECT_URI =
  process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? "";

export function getGoogleAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}
