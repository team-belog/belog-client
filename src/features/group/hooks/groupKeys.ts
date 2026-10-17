export const groupKeys = {
  all: ["groups"] as const,
  list: () => [...groupKeys.all, "list"] as const,
  detail: (id: number) => [...groupKeys.all, "detail", id] as const,
  members: (groupId: number, query?: string) =>
    [...groupKeys.all, "members", groupId, query] as const,
  pastMeetings: (groupId: number) =>
    [...groupKeys.all, "pastMeetings", groupId] as const,
};
