export function getPrismicLinkUrl(link: any) {
  if (link === undefined) return "";

  const url = link.url;
  if (!(typeof url === "string")) {
    console.error("The link has no url!");
    return "";
  }
  return url;
}

export function getPrismicObjId(obj: any) {
  if (!obj) return "";

  const id = obj.id;
  if (!(typeof id === "string")) {
    console.error("The object has no id!");
    return "";
  }
  return id;
}
