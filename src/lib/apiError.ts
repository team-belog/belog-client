import axios from "axios";

export type FieldError = {
  field: string;
  reason: string;
};

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type ApiErrorData = {
  fieldErrors: FieldError[];
  timestamp: string;
};

const DEFAULT_MESSAGE = "알 수 없는 오류가 발생했습니다.";
const NETWORK_MESSAGE = "네트워크 연결을 확인해 주세요.";

export class ApiError extends Error {
  status: number;
  code: string;
  fieldErrors: FieldError[];

  constructor(
    status: number,
    code: string,
    message: string,
    fieldErrors: FieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

// 응답 본문이 없는 경우(406 등)와 네트워크 오류도 ApiError로 통일
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError<Partial<ApiResponse<Partial<ApiErrorData>>>>(error)) {
    if (!error.response) {
      return new ApiError(0, "NETWORK_ERROR", NETWORK_MESSAGE);
    }
    const { status, data } = error.response;
    return new ApiError(
      status,
      data?.code ?? "UNKNOWN",
      data?.message ?? DEFAULT_MESSAGE,
      data?.data?.fieldErrors ?? [],
    );
  }

  return new ApiError(
    0,
    "UNKNOWN",
    error instanceof Error ? error.message : DEFAULT_MESSAGE,
  );
}
