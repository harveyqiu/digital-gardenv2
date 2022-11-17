import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent } from 'pliny/utils/contentlayer'
import { MDXDocument, sortedPosts } from 'utils/contentlayer'
import { allBlogs, allNotes } from 'contentlayer/generated'
import type { Blog, Note } from 'contentlayer/generated'

const POSTS_PER_PAGE = 7

export const dynamicParams = false;

export async function generateStaticParams() {
    const totalBlogPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
    const blogPaths = Array.from({ length: totalBlogPages }, (_, i) => ({
        type: 'blog',
        page: (i + 1).toString(),
    }))

    const totalNotePages = Math.ceil(allNotes.length / POSTS_PER_PAGE)
    const notePaths = Array.from({ length: totalNotePages }, (_, i) => ({
        type: 'note',
        page: (i + 1).toString(),
    }))

    const paths = blogPaths.concat(notePaths);

    return paths;
}

async function getPosts(type, page) {
    var posts : Array<MDXDocument>
    if (type == 'blog') {
        var posts = sortedPosts(allBlogs)
    } else {
        var posts = sortedPosts(allNotes)
    }

    const pageNumber = parseInt(page as string)
    const initialDisplayPosts = posts.slice(
      POSTS_PER_PAGE * (pageNumber - 1),
      POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }
  
    return {
        initialDisplayPosts: allCoreContent(initialDisplayPosts),
        posts: allCoreContent(posts),
        pagination,
    }
}

export default async function PostPage({ params }) {

    const { posts,initialDisplayPosts, pagination } = await getPosts(params.type, params.page)

  return (
    <>
      {/* <PageSEO title={siteMetadata.title} description={siteMetadata.description} /> */}
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
