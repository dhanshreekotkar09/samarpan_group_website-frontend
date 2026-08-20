export function isVideoMedia(item) {
  if (item?.type === "video") return true;
  const url = item?.url || item?.image || "";
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}
