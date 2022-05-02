import Box from "@/component/Box";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { strToNum } from "@/extra/Utils";
import { SUPPORTING_FORMAT } from "@/extra/Constants";
import useForm from "@/Hooks/useForm";
import { useEffect, useRef } from "react";

export default function SaveModal({ closeSelf }) {
  const focusRef = useRef(null);

  const saveForm = useForm(
    "saveOption",
    (options) => {
      const { width, height, format, name = "output", quality = 100 } = options;
      const [mimeType, extension] = format.split("/");

      const gallery = document.querySelector("#gallery");
      if (gallery == undefined) return alert(ALERT_NO_IMG_FOR_EXPORT);
      gallery.style.transform = "scale(1)";
      gallery.style.background = "transparent";

      const previewSize = getComputedStyle(gallery);
      const scale =
        height / strToNum(previewSize.height) ||
        width / strToNum(previewSize.width) ||
        1;

      html2canvas(gallery, { scale, backgroundColor: null })
        .then((canvas) => canvas.toDataURL(mimeType, quality / 100))
        .then((url) => saveAs(url, `${name}.${extension}`))
        .catch((error) => alert(error))
        .finally(() => (gallery.style = undefined));
      // .finally(() => window.close(windowID));
    },
    true
  );

  useEffect(() => focusRef.current.focus(), []);

  return (
    <Box className="save-modal">
      <form>
        <header style={{ gridColumn: "span 2" }}>Export Assests</header>

        <label htmlFor="save-option-id">Format:</label>
        <select
          id="save-option-id"
          name="format"
          ref={focusRef}
          value={saveForm.data.format}
          onChange={saveForm.change}
        >
          {SUPPORTING_FORMAT.map((format, index) => (
            <option value={format.join("/")} key={index} children={format[1]} />
          ))}
        </select>

        <label htmlFor="save-option-name">File Name:</label>
        <input
          id="save-option-name"
          type="text"
          name="name"
          placeholder="filename"
          value={saveForm.data.name}
          onChange={saveForm.change}
        />

        <label htmlFor="save-option-width">Width (px):</label>
        <input
          id="save-option-width"
          type="number"
          name="width"
          placeholder="px"
          value={saveForm.data.width}
          onChange={saveForm.change}
        />

        <label htmlFor="save-option-height">Height (px):</label>
        <input
          id="save-option-height"
          type="number"
          name="height"
          placeholder="px"
          value={saveForm.data.height}
          onChange={saveForm.change}
        />

        <label htmlFor="save-option-quality">Image Quality:</label>
        <input
          id="save-option-quality"
          type="number"
          name="quality"
          placeholder="%"
          value={saveForm.data.quality}
          onChange={(e) => {
            e.target.value > 0 && e.target.value < 100 && saveForm.change(e);
          }}
        />

        <button type="button" children="Export" onClick={saveForm.submit} />
        <button type="button" children="Cancel" onClick={closeSelf} />
      </form>
    </Box>
  );
}
