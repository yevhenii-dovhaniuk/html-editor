export const debounce = (functionToDebounce: () => void, debounceTime: number) => {
  const startTiming = () => {
    return setTimeout(() => {
      functionToDebounce();
    }, debounceTime) as unknown as number;
  }

  let timeoutId: number;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = startTiming();
  }
}