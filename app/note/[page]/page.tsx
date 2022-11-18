import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { allCoreContent } from 'utils/contentlayer'
import { MDXDocument, sortedPosts } from 'utils/contentlayer'
import { allBlogs, allNotes } from 'contentlayer/generated'
import type { Blog, Note } from 'contentlayer/generated'

const POSTS_PER_PAGE = 7

export const dynamicParams = false

export async function generateStaticParams() {
    const totalNotePages = Math.ceil(allNotes.length / POSTS_PER_PAGE)
    const notePaths = Array.from({ length: totalNotePages }, (_, i) => ({
        page: (i + 1).toString(),
    }))

    return notePaths
}

async function getPosts(page: string) {
    let posts = sortedPosts(allNotes)

    const pageNumber = parseInt(page)
    const initialDisplayPosts = posts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    }

    return {
        initialDisplayPosts: initialDisplayPosts,
        posts: posts,
        pagination,
    }
}

export default async function PostPage({ params }) {
    const { posts, initialDisplayPosts, pagination } = await getPosts(params.page)

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
