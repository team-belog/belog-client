export const homeKeys = {
  all: ["home"] as const,
  activeMeetings: (query: string) =>
    [...homeKeys.all, "activeMeetings", query] as const,
  completedTickets: () => [...homeKeys.all, "completedTickets"] as const,
  calendar: (yearMonth: string) =>
    [...homeKeys.all, "calendar", yearMonth] as const,
};
