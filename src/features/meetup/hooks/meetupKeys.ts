export const meetupKeys = {
  all: ["meetups"] as const,
  detail: (id: number) => [...meetupKeys.all, "detail", id] as const,
};
