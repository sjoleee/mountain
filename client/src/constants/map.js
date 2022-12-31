import mntnMarkerIcon from "@assets/mntn_marker.png";
import searchedMntnMarkerIcon from "@assets/searched_mntn_marker.png";
import myLocationIcon from "@assets/my_location.png";

const GEO_OPTIONS = {
  //timeout: 5000, // 최대 대기 시간
  maximumAge: 10000, // 캐시 지속 시간
};

const DEFAULT_POSITION = {
  lat: 37.5642135,
  lng: 127.0016985,
};

const TOUR_SPOT_CODE = "AT4";

const MAX_MARKERS_NUM_DISPLAY_SCREEN = 6;

const MAP_SIZE = {
  width: "100vw",
  height: "100vh",
};

const MNTN_MARKER_ICON_PROPS = {
  src: mntnMarkerIcon,
  size: {
    width: 40,
    height: 47,
  },
  options: {
    offset: {
      x: 20,
      y: 60,
    },
  },
};

const SEARCHED_MNTN_MARKER_ICON_PROPS = {
  src: searchedMntnMarkerIcon,
  size: {
    width: 40,
    height: 47,
  },
  options: {
    offset: {
      x: 14,
      y: 60,
    },
  },
};

const MY_LOCATION_ICON_PROPS = {
  src: myLocationIcon,
  size: { width: 37, height: 40 },
};

const CLUSTER_STYLE_PROPS = [
  {
    background: "rgb(88 252 192 / 92%)",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "3.5rem",
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "50%",
  },
];

const SEARCH_OPTIONS = {
  category_group_code: TOUR_SPOT_CODE,
  size: MAX_MARKERS_NUM_DISPLAY_SCREEN,
};

export {
  GEO_OPTIONS,
  DEFAULT_POSITION,
  MAP_SIZE,
  MNTN_MARKER_ICON_PROPS,
  SEARCHED_MNTN_MARKER_ICON_PROPS,
  MY_LOCATION_ICON_PROPS,
  CLUSTER_STYLE_PROPS,
  SEARCH_OPTIONS,
};
