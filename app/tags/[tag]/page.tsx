// import { TagSEO } from '@/components/SEO'
// import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { kebabCase } from 'pliny/utils/kebabCase'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { getAllTags } from 'utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

export const dynamicParams = false;

export async function generateStaticParams() {
    const tags = await getAllTags(allBlogs)
    return Object.keys(tags).map((tag) => ({
          tag
      }))
}

async function getPostsAndTag (tag: string) {
    const filteredPosts = allCoreContent(
        allBlogs.filter(
          (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
        )
      )
    return {
        posts: filteredPosts,
        tag
    }
}

export default async function Tag({ params }) {
    const postsAndTag = await getPostsAndTag(params.tag)

  // Capitalize first letter and convert space to dash
  const title = params.tag[0].toUpperCase() + params.tag.split(' ').join('-').slice(1)
  return (
    <>
      {/* <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      /> */}
      <ListLayout posts={postsAndTag.posts} title={title} />
    </>
  )
}
