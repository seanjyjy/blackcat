import { useEffect, useState } from "react";

export function useNestedState<T>(
  value: T
): [state: T, setState: React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(value);
  useEffect(() => {
    setState(value);
  }, [value]);
  return [state, setState];
}
