import { setAmplitudeUserId } from "@/lib/amplitude";

let accessToken: string | null = null;

function getUserIdFromToken(token: string) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { sub } = JSON.parse(atob(payload)) as { sub?: string };
    return sub ?? null;
  } catch {
    return null;
  }
}

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string | null) => {
  accessToken = token;

  const userId = token ? getUserIdFromToken(token) : null;
  if (userId) setAmplitudeUserId(userId);
};
