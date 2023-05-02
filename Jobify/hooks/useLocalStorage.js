import { useState } from "react";

export function useLocalStorage(key, initialValue) {
    // valoarea initiala va fi incarcarea de date...
    const [state, setState] = useState(() => {
        // incarcam datele
        const localStorageElement = localStorage.getItem(key);
        if (localStorageElement) {
            return JSON.parse(localStorageElement);
        }
        return initialValue
        // daca avem date, parse them
        // altfel
        // returnam valoarea initiala
    });

    function handleStateChange(newValue) {
        setState(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [state, handleStateChange];
}
