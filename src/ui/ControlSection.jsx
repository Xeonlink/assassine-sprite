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
import { SAVE_MODAL_ID, SHORTCUT_MODAL_ID } from "@/extra/Constants";
import { getFiles } from "@/extra/Utils";
import useImage from "@/Hooks/useImage";
import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from "@/extra/Utils";
import { isMac } from "@/extra/Constants";
import ShortcutModal from "../modal/ShortcutModal";

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

    const targetScale = Math.min(
      (VIEWPORT_HEIGHT() / previewHeight) * 80,
      (VIEWPORT_WIDTH() / previewWidth) * 80
    );

    scale.set(Math.round(targetScale));
  }, [images.value.length, column.value]);

  // shortcut
  useEffect(() => {
    const handleKeydown = (e) => {
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
      // ctrl + "s"
      if (ctrlKey && e.key === "s") {
        e.preventDefault();
        window.toggle(<SaveModal />, SAVE_MODAL_ID);
        return;
      }
      // ctrl + "S"
      if (ctrlKey && e.key === "S") {
        e.preventDefault();
        window.toggle(<SaveModal />, SAVE_MODAL_ID);
        return;
      }
      // ctrl + "=";
      if (ctrlKey && e.key === "=") {
        scale.up();
        e.preventDefault();
        return;
      }
      // ctrl + "+";
      if (ctrlKey && e.key === "+") {
        e.preventDefault();
        scale.up({ shiftKey: true });
        return;
      }
      // ctrl + "-";
      if (ctrlKey && e.key === "-") {
        e.preventDefault();
        scale.down();
        return;
      }
      // ctrl + "_";
      if (ctrlKey && e.key === "_") {
        e.preventDefault();
        scale.down({ shiftKey: true });
        return;
      }
      // "?"
      if (e.key === "?") {
        e.preventDefault();
        window.toggle(<ShortcutModal />, SHORTCUT_MODAL_ID);
        return;
      }
      // "ctrl + ,"
      if (ctrlKey && e.key === ",") {
        e.preventDefault();
        column.down();
        return;
      }
      // "ctrl + <"
      if (ctrlKey && e.key === "<") {
        e.preventDefault();
        column.down({ shiftKey: true });
        return;
      }
      // "ctrl + >"
      if (ctrlKey && e.key === ".") {
        e.preventDefault();
        column.up();
        return;
      }
      // "ctrl + >"
      if (ctrlKey && e.key === ">") {
        e.preventDefault();
        column.up({ shiftKey: true });
        return;
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [scale]);

  return (
    <div className="control-section">
      <Box className="counter">
        <IcoButton onClick={column.down} src={IMG_MINUS} alt="column down" />
        <input
          type="number"
          value={column.value}
          placeholder="column"
          onChange={column.change}
        />
        <IcoButton onClick={column.up} src={IMG_PLUS} alt="column up" />
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
          onClick={() => window.open(<SaveModal />, SAVE_MODAL_ID)}
        />
        <IcoButton
          children="?"
          onClick={() => window.toggle(<ShortcutModal />, SHORTCUT_MODAL_ID)}
        />
        <IcoButton
          src={IMG_REMOVE}
          alt="add image"
          onClick={() => images.reset()}
        />
      </Box>

      <Box className="counter">
        <IcoButton onClick={scale.down} src={IMG_MINUS} alt="scale down" />
        <input
          type="number"
          value={scale.value}
          placeholder="scale"
          onChange={scale.change}
        />
        <IcoButton onClick={scale.up} src={IMG_PLUS} alt="scale up" />
      </Box>
    </div>
  );
}
