export const truncateUrl = (url: string, maxLength = 50) => {
  if (url.length <= maxLength) return url;
  const start = url.slice(0, 30);

  return `${start}...`;
};
