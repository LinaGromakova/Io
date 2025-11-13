export const redirect = (path: string) => {
  if (typeof window === 'undefined') return;
  window.location.href = window.location.origin + path;
};
