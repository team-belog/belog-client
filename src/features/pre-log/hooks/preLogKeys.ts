export const preLogKeys = {
  all: ["preLogs"] as const,
  main: (meetingId: number) => [...preLogKeys.all, "main", meetingId] as const,
};
