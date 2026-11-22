const VIDEO_EXT = /\.(mp4|webm|mov|m4v|avi|mkv|3gp|mpeg|mpg)(\?|$)/i;

export function isVideoMedia(item) {
  if (!item) return false;
  if (typeof item === "string") {
    return VIDEO_EXT.test(item) || item.includes("/video/upload/");
  }
  if (
    item.type === "video" ||
    item.mediaType === "video" ||
    item.resource_type === "video" ||
    item.mimeType?.startsWith("video")
  ) {
    return true;
  }
  const url = item.url || item.image || item.src || "";
  return VIDEO_EXT.test(url) || url.includes("/video/upload/");
}
