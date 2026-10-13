export const meetupKeys = {
  all: ["meetups"] as const,
  detail: (id: number) => [...meetupKeys.all, "detail", id] as const,
  members: (id: number) => [...meetupKeys.all, "members", id] as const,
};
