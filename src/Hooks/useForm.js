import { useState } from "react";

export default function useForm(defaultValues, submitCallback) {
  const [data, setData] = useState(defaultValues || {});

  const change = (e, preprocessor) => {
    if (e === "set") {
      return setData({ ...data, ...preprocessor });
    }

    if (!preprocessor) {
      // key : e.target.name // value : e.target.value
      return setData({ ...data, [e.target.name]: e.target.value });
    }

    if (typeof preprocessor !== "function") {
      // key : e // value : preprocessor
      return setData({ ...data, [e]: preprocessor });
    }

    // key : e.target.name // value : prerpocessor : e.target.value
    setData({ ...data, [e.target.name]: preprocessor(e.target.value) });
  };

  const submit = (e) => {
    e.preventDefault();
    if (submitCallback && typeof submitCallback === "function") {
      submitCallback(data);
    }
  };

  return { data, change, submit };
}
