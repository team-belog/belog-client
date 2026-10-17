// 서버가 위치를 추출할 수 있는 지도 링크만 허용
// - 카카오맵: https://place.map.kakao.com/{장소ID}
// - 구글지도: maps.app.goo.gl, goo.gl/maps, www.google.com/maps, maps.google.com
const KAKAO_PLACE_PATH = /^\/\d+\/?$/;

export function isSupportedMapUrl(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;

  const { hostname, pathname } = url;

  switch (hostname) {
    case "place.map.kakao.com":
      return KAKAO_PLACE_PATH.test(pathname);
    case "maps.app.goo.gl":
      return pathname.length > 1;
    case "goo.gl":
      return pathname.startsWith("/maps/");
    case "www.google.com":
    case "google.com":
      return pathname === "/maps" || pathname.startsWith("/maps/");
    case "maps.google.com":
      return true;
    default:
      return false;
  }
}
