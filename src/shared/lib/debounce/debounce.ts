export function debounce<T extends (...args: unknown[]) => Promise<void>>(
  func: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), ms);
  };
}
