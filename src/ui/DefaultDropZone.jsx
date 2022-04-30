import Box from "@/component/Box";
import useImage from "@/Hooks/useImage";
import IcoButton from "@/component/IcoButton";
import IMG_DROPZONE from "@/img/dropzone100.svg";

export default function DefaultDropZone() {
  const images = useImage();

  return (
    images.value.length < 1 && (
      <Box
        className="default-dropzone"
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          images.add(e.dataTransfer.files);
        }}
      >
        <Box className="inner-zone">
          Drop here
          <IcoButton src={IMG_DROPZONE} />
        </Box>
      </Box>
    )
  );
}
