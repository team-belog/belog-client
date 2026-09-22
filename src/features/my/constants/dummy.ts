import type { Schedule } from "@/features/home/types";

export const DUMMY_PROFILE = {
  name: "이정원",
  email: "bellajw292@gmail.com",
  profileImageUrl: "/icons/default-profile.svg",
};

export const DUMMY_CALENDAR = {
  year: 2026,
  month: 9,
  memoryCount: 3,
  daySchedules: {
    5: {
      id: 1,
      title: "1박 2일 광주 여행",
      startDate: "2026-09-05",
      endDate: "2026-09-06",
      description: "친구들과 다녀온 첫 여행! 너무 재밌었다!!\n광주는 낭만의 도시야..",
      leaderName: "이정원",
      memberCount: 3,
      status: "done",
      photoUrl: "/images/dummy/sample-photo.png",
      destinationCity: "Gwangju",
      destinationCountry: "Korea",
      memberHandles: ["@thisgarten", "@0omiin_", "@by__byeee"],
    },
    12: {
      id: 2,
      title: "당일치기 부산 여행",
      startDate: "2026-09-12",
      endDate: "2026-09-12",
      description: "바다 보고 싶어서 갔다온 부산!",
      leaderName: "이정원",
      memberCount: 2,
      status: "done",
      photoUrl: "/images/dummy/sample-photo.png",
      destinationCity: "Busan",
      destinationCountry: "Korea",
      memberHandles: ["@thisgarten", "@0omiin_"],
    },
    20: {
      id: 3,
      title: "2박 3일 제주 여행",
      startDate: "2026-09-20",
      endDate: "2026-09-22",
      description: "제주도 올레길 완주 도전!",
      leaderName: "이정원",
      memberCount: 4,
      status: "done",
      photoUrl: "/images/dummy/sample-photo.png",
      destinationCity: "Jeju",
      destinationCountry: "Korea",
      memberHandles: ["@thisgarten", "@0omiin_", "@by__byeee"],
    },
  } as Record<number, Schedule>,
};
