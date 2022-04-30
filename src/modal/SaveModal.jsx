import Box from "@/component/Box";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import useForm from "@/Hooks/useForm";
import { strToNum } from "@/extra/Utils";
import { SUPPORTING_EXTENSIONS } from "@/extra/Constants";
import useWindow from "@/Hooks/useWindow";
import { useSelector } from "react-redux";

export default function SaveModal({ windowID }) {
  const window = useWindow();
  const saveForm = useForm({ type: "png" }, (saveOption) => {
    const { width, height, type, name = "output", quality = 100 } = saveOption;

    const targetElement = document.querySelector(".gallery");
    targetElement.style.transform = "scale(1)";
    targetElement.style.background = "transparent";

    const previewSize = getComputedStyle(targetElement);
    const scale =
      height / strToNum(previewSize.height) ||
      width / strToNum(previewSize.width) ||
      1;

    html2canvas(targetElement, { scale, backgroundColor: null })
      .then((canvas) => canvas.toDataURL(type, quality / 100))
      .then((url) => saveAs(url, `${name}.${type}`))
      .catch((error) => alert(error))
      .finally(() => (targetElement.style = undefined));
    // .finally(() => window.close(windowID));
  });

  return (
    <Box className="save-modal">
      <form onSubmit={saveForm.submit}>
        <header style={{ gridColumn: "span 2" }}>Export Assests</header>

        <label htmlFor="save-option-id">Format:</label>
        <select
          id="save-option-id"
          name="type"
          value={saveForm.type}
          onChange={saveForm.change}
        >
          {SUPPORTING_EXTENSIONS.map((extension, index) => (
            <option value={`image/${extension}`} key={index}>
              {extension}
            </option>
          ))}
        </select>

        <label htmlFor="save-option-name">File Name:</label>
        <input
          id="save-option-name"
          type="text"
          name="name"
          placeholder="filename"
          value={saveForm.name}
          onChange={saveForm.change}
        />

        <label htmlFor="save-option-width">Width:</label>
        <input
          id="save-option-width"
          type="number"
          name="width"
          placeholder="px"
          value={saveForm.width}
          onChange={saveForm.change}
        />

        <label htmlFor="save-option-height">Height:</label>
        <input
          id="save-option-height"
          type="number"
          name="height"
          placeholder="px"
          value={saveForm.height}
          onChange={saveForm.change}
        />

        <label htmlFor="save-option-quality">Image Quality:</label>
        <input
          id="save-option-quality"
          type="number"
          name="quality"
          placeholder="%"
          value={saveForm.quality}
          onChange={(e) => {
            e.target.value > 0 && e.target.value < 100 && saveForm.change(e);
          }}
        />

        <button type="submit">Export</button>
        <button
          type="button"
          children="Cancel"
          onClick={(e) => window.close(windowID)}
        />
      </form>
    </Box>
  );
}
