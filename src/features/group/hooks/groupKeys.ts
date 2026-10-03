export const groupKeys = {
  all: ["groups"] as const,
  list: () => [...groupKeys.all, "list"] as const,
  detail: (id: number) => [...groupKeys.all, "detail", id] as const,
};
