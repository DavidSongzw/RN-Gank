export function getFullPath ({path, w, h}) {
  let fullPath = path
  fullPath += `?imageView2/1/w/${w}/h/${h}/interlace/1`
  return fullPath
}
