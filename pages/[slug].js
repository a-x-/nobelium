import Layout from '@/layouts/layout'
import { getPostBlocks } from '@/lib/notion'
import BLOG from '@/blog.config'
import { createHash } from 'crypto'
import { NotionAPI } from 'notion-client'

const BlogPost = ({ post, blockMap, emailHash }) => {
  if (!post) return null
  console.log({post})
  return (
    <Layout
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      fullWidth={post.fullWidth}
    />
  )
}

export async function getStaticPaths () {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps ({ params: { slug } }) {
  const post = getPost(slug)
  const blockMap = await getPostBlocks(slug)
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
