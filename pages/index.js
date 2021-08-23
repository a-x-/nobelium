import Layout from '@/layouts/layout'
import { getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'
import { NotionAPI } from 'notion-client'

const BlogPost = ({ post, blockMap, emailHash }) => {
  if (!post) return null
  return (
    <Layout
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      fullWidth={post.fullWidth}
    />
  )
}

export async function getStaticProps () {
console.log('static props wtf', BLOG.notionPageId)
  const authToken = BLOG.notionAccessToken || null
  const api = new NotionAPI({ authToken })
  const post = await api.getPage(BLOG.notionPageId)
  const blockMap = await getPostBlocks(BLOG.notionPageId)
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1
  }
}

export default BlogPost
