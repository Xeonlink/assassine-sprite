import useRedux from "./useRedux";
import { isImg, getImgSize, isSameSize } from "@/extra/Utils";
import {
  INVALID_IMG_FILE_ALERT,
  INVALID_IMG_SIZE_ALERT,
} from "@/extra/Constants";

export default function useImage() {
  const [value, set] = useRedux("images");

  const add = async (fileList) => {
    let files = [...fileList];

    // 이미지가 아닌 파일이 포함된 경우
    if (!files.every(isImg)) return alert(INVALID_IMG_FILE_ALERT);

    files = files.filter(isImg);
    files = await Promise.all(
      files.map(async (img) => ({
        name: img.name,
        uri: URL.createObjectURL(img),
        ...(await getImgSize(img)),
      }))
    );

    // 크기가 다른 이미지가 포함된 경우
    isSameSize("set", value[0] || files[0]);
    if (!files.every(isSameSize)) return alert(INVALID_IMG_SIZE_ALERT);

    set([...value, ...files]);
  };

  const remove = (index) => {
    value.splice(index, 1);
    set([...value]);
  };

  const reset = () => {
    set([]);
  };

  return { value, set, add, remove, reset };
}

// const targetIndex = e.dataTransfer.getData("index") * 1;
