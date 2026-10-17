// 카카오맵 JavaScript SDK 중 프로젝트에서 사용하는 부분만 선언
declare namespace kakao.maps {
  function load(callback: () => void): void;

  class LatLng {
    constructor(latitude: number, longitude: number);
  }

  class Size {
    constructor(width: number, height: number);
  }

  class MarkerImage {
    constructor(src: string, size: Size);
  }

  class Map {
    constructor(container: HTMLElement, options: { center: LatLng; level: number });
    setCenter(latlng: LatLng): void;
  }

  class Marker {
    constructor(options: { map?: Map; position: LatLng; title?: string; image?: MarkerImage });
  }
}

interface Window {
  kakao?: typeof kakao;
}
