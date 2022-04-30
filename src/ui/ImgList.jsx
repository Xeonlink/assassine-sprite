import { useSelector } from "react-redux";
import Box from "@/component/Box";
import IcoButton from "@/component/IcoButton";

export default function ImgList() {
  const images = useSelector((root) => root.images);

  return (
    <Box className="img-list">
      {images.map((file, index) => (
        <IcoButton type="button" src={file.uri} alt={file.name} key={index} />
      ))}
    </Box>
  );
}
