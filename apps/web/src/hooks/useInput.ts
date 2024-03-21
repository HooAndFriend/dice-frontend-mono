import { useState, useCallback, ChangeEvent } from "react";

const useInput = <T extends Record<string, any>>(initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    },
    [data],
  );

  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = e.target;
      setData({
        ...data,
        [name]: value,
      });
    },
    [data],
  );

  const handleInit = useCallback(() => setData(initialValue), [data]);

  return { data, handleInit, setData, handleInput, handleSelect } as const;
};

export default useInput;
