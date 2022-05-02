export const SUPPORTING_FORMAT = [
  ["bmp", "bmp"],
  ["gif", "gif"],
  ["vnd.microsoft.icon", "ico"],
  ["jpeg", "jpeg"],
  ["jpg", "jpg"],
  ["png", "png"], // TODO : 기본값을 png로 바꾸기, png의 index 자동탐지
  ["tiff", "tif"],
  ["tiff", "tiff"],
  ["webp", "webp"],
];
export const ALERT_INVALID_IMG_FILE =
  "이미지가 아닌 파일이 포함되어 있거나, 지원하지 않는 형식입니다.";
export const ALERT_INVALID_IMG_SIZE =
  "유효하지 않은 크기의 이미지가 포함되어 있습니다.";
export const ALERT_NO_IMG_FOR_EXPORT = "내보낼 이미지가 존재하지 않습니다.";
export const SAVE_MODAL_ID = 2379485;
export const SHORTCUT_MODAL_ID = 927034;
export const isMac = navigator.platform.match("Mac");
