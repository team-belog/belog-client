export const meetupKeys = {
  all: ["meetups"] as const,
  detail: (id: number) => [...meetupKeys.all, "detail", id] as const,
  datePoll: (id: number) => [...meetupKeys.all, "datePoll", id] as const,
  datePollResults: (id: number) =>
    [...meetupKeys.all, "datePollResults", id] as const,
};
