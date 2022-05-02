import useRedux from "./useRedux";

export default function useWindow() {
  const [windows, setWindows] = useRedux("windows");

  const close = (windowID) => {
    setWindows(windows.filter((window) => window.key * 1 !== windowID));
  };

  const open = (ui, id = Date.now()) => {
    if (windows.some((window) => window.key === id)) return;
    setWindows([
      ...windows,
      {
        ...ui,
        key: id,
        props: {
          ...ui.props,
          windowID: id,
          closeSelf: () => {
            setWindows(windows.filter((window) => window.key * 1 !== id));
          },
        },
      },
    ]);
  };

  const toggle = (ui, id) => {
    const isShowing = windows.some((window) => window.key === id);
    isShowing ? close(id) : open(ui, id);
  };

  return { open, close, toggle };
}
