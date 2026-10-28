import { useEffect, useState } from 'react';

// Devolve o valor só depois que ele ficar "parado" por `delay` ms.
// Cada mudança reinicia a espera (o cleanup cancela o timer anterior).
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
