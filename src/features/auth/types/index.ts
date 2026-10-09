export type BankCode =
  | "KDB" | "IBK" | "KB_KOOKMIN" | "SUHYUP" | "NH_NONGHYUP_BANK"
  | "LOCAL_NONGHYUP" | "WOORI" | "SC_JEIL" | "CITI" | "IM_BANK"
  | "BUSAN" | "GWANGJU" | "JEJU" | "JEONBUK" | "GYEONGNAM"
  | "SAEMAUL" | "SHINHYUP" | "SAVINGS_BANK" | "POST_OFFICE"
  | "HANA" | "SHINHAN" | "K_BANK" | "KAKAO_BANK" | "TOSS_BANK"

export type OnboardingRequest = {
  nickname: string
  name: string
  bankCode: BankCode
  accountNumber: string
  accountHolderName: string
  profileImageObjectKey?: string
}

export type ProfileImageType = "CUSTOM" | "DEFAULT"

export type UpdateProfileRequest = {
  nickname?: string
  profileImageObjectKey?: string
  profileImageType?: ProfileImageType
}

export type BankAccountResponse = {
  bankCode: BankCode
  bankName: string
  accountNumber: string
  accountHolderName: string
}

export type UpdateBankAccountRequest = {
  bankCode: BankCode
  accountNumber: string
  accountHolderName: string
}

export type MyProfileResponse = {
  nickname: string
  email: string
  profileImageUrl: string | null
}

export type NicknameAvailabilityResponse = {
  nickname: string
  available: boolean
}

export type ProfileImageUploadUrlRequest = {
  contentType: string
  fileSize: number
}

export type ProfileImageUploadUrlResponse = {
  objectKey: string
  uploadUrl: string
  method: string
  requiredHeaders: {
    "Content-Type": string
    "Content-Length": string
  }
  expiresAt: string
}

export type GoogleLoginRequest = {
  authorizationCode: string;
  redirectUri: string;
};

export type GoogleLoginData = {
  accessToken: string;
  expiresIn: number;
  onboardingRequired: boolean;
  socialProfileImageUrl: string;
};
