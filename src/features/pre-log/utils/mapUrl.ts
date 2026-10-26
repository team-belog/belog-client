// 지도 종류와 상관없이 http(s) 링크면 허용
// 공유하기로 복사하면 "[네이버지도] 장소명 주소 https://..."처럼 앞에 문구가 붙으므로 http(s)://로 시작해야 함
const HTTP_URL_PREFIX = /^https?:\/\//;

export function isHttpUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!HTTP_URL_PREFIX.test(trimmed)) return false;

  try {
    new URL(trimmed);
    return true;
  } catch {
    return false;
  }
}
