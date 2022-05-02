export function isImg(file) {
  return file.type.includes("image");
}

export function strToNum(string) {
  return string.replace(/[^0-9.]/g, "") * 1;
}

let imgUItemp;
export function getImgSize(img, timeout = 1000) {
  return new Promise((resolve, reject) => {
    try {
      if (img === undefined) reject("getImgSize : img is undefined");

      const imgUI = imgUItemp || new Image();
      imgUI.src = typeof img === "string" ? img : URL.createObjectURL(img);
      imgUI.onload = () =>
        resolve({ width: imgUI.width, height: imgUI.height });

      setTimeout(() => reject("getImgSize : img loading timeout"), timeout);
    } catch (error) {
      reject("getImgSize : something error");
    }
  });
}

let baseImg;
export function isSameSize(target1, target2) {
  if (target1 === "set") {
    baseImg = target2;
    return;
  }

  return baseImg.width === target1.width && baseImg.height === target1.height;
}

export function strToFileName(str) {
  return str
    .trim()
    .replace(/[`~!@#$%^&*|\\'";:/?]/gi, "")
    .split(".")[0];
}

let inputUITemp;
export function getFiles(callback) {
  if (!inputUITemp) {
    inputUITemp = document.createElement("input");
    inputUITemp.type = "file";
    inputUITemp.multiple = true;
    inputUITemp.accept = "image/*";
  }
  inputUITemp.onchange = () => {
    callback(inputUITemp.files);
    inputUITemp.value = "";
  };
  inputUITemp.click();
}

export const VIEWPORT_WIDTH = () =>
  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
export const VIEWPORT_HEIGHT = () =>
  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

export const clearDefault = (e) => e.preventDefault();
