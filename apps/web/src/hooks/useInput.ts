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
    [data]
  );

  const handleInit = useCallback(() => setData(initialValue), [data]);

  return { data, handleInit, setData, handleInput } as const;
};

export default useInput;
