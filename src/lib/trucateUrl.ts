export const truncateUrl = (url: string, maxLength = 40) => {
  if (url.length <= maxLength) return url;
  const start = url.slice(0, 20);

  return `${start}...`;
};
