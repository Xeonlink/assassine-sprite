import { useSelector } from "react-redux";
import styled from "styled-components";
import IMG_TRANSPARENT from "@/img/transparent70.svg";
import useImage from "@/Hooks/useImage";
import Box from "@/component/Box";
import IMG_DROPZONE from "@/img/dropzone100.svg";
import IcoButton from "@/component/IcoButton";

const Gallery = styled.div.attrs({ className: "gallery" })`
  background: url(${IMG_TRANSPARENT});
  transition: 1s;
  transform: scale(${({ scale }) => scale});

  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, auto);

  & img {
    transition: 0.5s;
    cursor: pointer;
  }
  & img:hover {
    border-radius: 10%;
    transform: scale(0.9);
  }
`;

export default function Preview() {
  const images = useImage();
  const scale = useSelector((root) => root.scale);
  const column = useSelector((root) => root.column);

  const onDropImgRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    images.add(e.dataTransfer.files);
  };

  return images.value.length < 1 ? (
    <Box className="default-dropzone" onDrop={onDropImgRemove}>
      <IcoButton src={IMG_DROPZONE} children="Drop here" />
    </Box>
  ) : (
    <Gallery scale={scale / 100} column={column} onDrop={onDropImgRemove}>
      {images.value.map((file, index) => (
        <img
          className="gallery-img"
          src={file.uri}
          alt={file.name}
          onDragStart={(e) => e.dataTransfer.setData("index", index)}
          key={index}
        />
      ))}
    </Gallery>
  );
}
