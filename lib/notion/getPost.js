export default function getPost(id) {
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  const page = await api.getPage(slug)

  const properties = {...page}

  // Add fullwidth, createdtime to properties
  properties.createdTime = new Date(
    page.block[id].value?.created_time
  ).toString()
  properties.fullWidth = page.block[id].value?.format?.page_full_width ?? false

  return properties
}
