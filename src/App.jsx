import "./App.css";
import { useSelector } from "react-redux";
import Preview from "@/ui/Preview";
import ImgList from "@/ui/ImgList";
import useImage from "@/Hooks/useImage";
import ControlSection from "./ui/ControlSection";
import { clearDefault } from "./extra/Utils";

export default function App() {
  const images = useImage();

  const onDrop = (e) => {
    e.preventDefault();
    const targetIndex = e.dataTransfer.getData("index");
    if (targetIndex === "") return;
    images.remove(targetIndex * 1);
  };

  return (
    <div className="App" onDrop={onDrop} onDragOver={clearDefault}>
      <Preview />
      <ImgList />
      <ControlSection />
      <ModalContainer />
    </div>
  );
}

function ModalContainer() {
  const windows = useSelector((root) => root.windows);

  return <div style={{ position: "absolute" }}>{windows}</div>;
}
