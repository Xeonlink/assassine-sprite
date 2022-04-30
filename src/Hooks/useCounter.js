import useRedux from "./useRedux";

export default function useCounter(props) {
  const { name, min, max, step, shiftStep, initValue } = props;

  const [value, set] = useRedux(name, initValue);

  const up = (e) => {
    const realStep = e.shiftKey ? shiftStep : step;
    if (max !== undefined && max < value * 1 + realStep) return set(max);
    set(((value * 1 + realStep) * 100) / 100);
  };

  const change = (e) => {
    if (min !== undefined && e.target.value * 1 < min) return set(min);
    if (max !== undefined && max < e.target.value * 1) return set(max);
    set(e.target.value * 1);
  };

  const down = (e) => {
    const realStep = e.shiftKey ? shiftStep : step;
    if (min !== undefined && value * 1 - realStep < min) return set(min);
    set(((value * 1 - realStep) * 100) / 100);
  };

  return { value, set, up, change, down };
}
