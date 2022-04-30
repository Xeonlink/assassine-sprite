import useRedux from "./useRedux";

export default function useWindow() {
  const [windows, setWindows] = useRedux("windows");

  const open = (ui, id = Date.now()) => {
    if (windows.some((window) => window.key === id)) return;
    setWindows([
      ...windows,
      { ...ui, key: id, props: { ...ui.props, windowID: id } },
    ]);
  };

  const close = (windowID) => {
    setWindows(windows.filter((window) => window.key * 1 !== windowID));
  };

  return { open, close };
}
