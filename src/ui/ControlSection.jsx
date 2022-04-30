import useCounter from "@/Hooks/useCounter";
import { useEffect } from "react";
import Box from "@/component/Box";
import IMG_MINUS from "@/img/minus50.svg";
import IMG_PLUS from "@/img/plus50.svg";
import IcoButton from "@/component/IcoButton";
import IMG_ADD from "@/img/plus50.svg";
import IMG_SAVE from "@/img/save50.svg";
import IMG_REMOVE from "@/img/cross50.svg";
import useWindow from "@/Hooks/useWindow";
import SaveModal from "@/modal/SaveModal";
import { SAVEMODAL_ID } from "@/extra/Constants";
import { getFiles } from "@/extra/Utils";
import useImage from "@/Hooks/useImage";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/extra/Utils";

export default function ControlSection() {
  const images = useImage();
  const window = useWindow();
  const column = useCounter({
    name: "column",
    min: 1,
    step: 1,
    shiftStep: 2,
    initValue: 7,
  });
  const scale = useCounter({
    name: "scale",
    min: 0,
    step: 1,
    shiftStep: 10,
    initValue: 100,
  });

  // auto scaling
  useEffect(() => {
    if (!images.value[0]) return;
    const { width: baseWidth, height: baseHeight } = images.value[0];
    const realColumnCount = Math.min(images.value.length, column.value);
    const realRowCount = images.value.length / column.value + 1;
    const previewWidth = baseWidth * realColumnCount;
    const previewHeight = baseHeight * realRowCount;

    const targetScale =
      previewWidth < previewHeight
        ? (VIEWPORT_HEIGHT() / previewHeight) * 80
        : (VIEWPORT_WIDTH() / previewWidth) * 80;

    scale.set(Math.round(targetScale));
  }, [images.value.length, column.value]);

  return (
    <div className="control-section">
      <Box className="counter">
        <IcoButton
          onClick={column.down}
          src={IMG_MINUS}
          alt="columnCount down"
        />
        <input
          type="number"
          value={column.value}
          placeholder="column"
          onChange={column.change}
        />
        <IcoButton onClick={column.up} src={IMG_PLUS} alt="columnCount up" />
      </Box>

      <Box className="main-controller">
        <IcoButton
          src={IMG_ADD}
          alt="add image"
          onClick={() => getFiles(images.add)}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            images.add(e.dataTransfer.files);
          }}
        />
        <IcoButton
          src={IMG_SAVE}
          alt="add image"
          onClick={() => window.open(<SaveModal />, SAVEMODAL_ID)}
        />
        {/* <IcoButton
        src={IMG_THEME}
        alt="add image"
        onClick={() => window.open(<SaveModal />, SAVEMODAL_ID)}
      /> */}
        <IcoButton
          src={IMG_REMOVE}
          alt="add image"
          onClick={() => images.reset()}
        />
      </Box>

      <Box className="counter">
        <IcoButton
          onClick={scale.down}
          src={IMG_MINUS}
          alt="previewScale down"
        />
        <input
          type="number"
          value={scale.value}
          placeholder="scale"
          onChange={scale.change}
        />
        <IcoButton onClick={scale.up} src={IMG_PLUS} alt="previewScale up" />
      </Box>
    </div>
  );
}
