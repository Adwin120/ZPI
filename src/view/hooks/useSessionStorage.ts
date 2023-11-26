import { useCallback, useEffect, useState } from "react";

export const useSessionStorage = <T extends string>(key: string, defaultValue: T) => {
    const [value, setValue] = useState<T>(sessionStorage.getItem(key) as T ?? defaultValue);

    const setStorageValue = useCallback((value: T) => {
        sessionStorage.setItem(key, value);
        setValue(value)
    }, []);

    return [value, setStorageValue] as const;
};
