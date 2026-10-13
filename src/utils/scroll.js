export const scrollToHash = (hash, behavior = 'smooth') => {
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return false;
  el.scrollIntoView({ behavior });
  return true;
};
