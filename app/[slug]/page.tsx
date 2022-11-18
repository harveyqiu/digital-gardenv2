import PageTitle from '@/components/PageTitle'

import { coreContent } from 'pliny/utils/contentlayer'
import { sortedPosts } from 'utils/contentlayer'
import { allBlogs, allNotes } from 'contentlayer/generated'
import type { Blog, Note } from 'contentlayer/generated'
import MDXRender from '@/components/MDX'

export const dynamicParams = false

export async function generateStaticParams() {
    const blogPaths = allBlogs.map((p) => ({ slug: p.slug }))

    const notePaths = allNotes.map((p) => ({ slug: p.slug }))

    return notePaths.concat(blogPaths)
}

async function getPost({ params }) {
    const slug = params.slug
    //   const slug = (params.slug as string[]).join('/')
    const sortedBlog = sortedPosts(allBlogs) as Blog[]
    const sortedNote = sortedPosts(allNotes) as Note[]
    const type = sortedBlog.findIndex((p) => p.slug === slug)  != -1 ? 'blog' : 'note'

    switch(type) {
        case 'blog':
            let blogIndex = sortedBlog.findIndex((p) => p.slug === slug)
            let prevBlog = sortedBlog[blogIndex + 1] || null
            let prevBlogContent = prevBlog ? coreContent(prevBlog) : null
            let nextBlog = sortedBlog[blogIndex - 1] || null
            let nextBlogContent = nextBlog ? coreContent(nextBlog) : null
            let blog = sortedBlog.find((p) => p.slug === slug)
            
            return {
                post:blog,
                prev:prevBlogContent,
                next:nextBlogContent,
            }
        case 'note':
            let postIndex = sortedNote.findIndex((p) => p.slug === slug)
            let prevContent = sortedNote[postIndex + 1] || null
            let prev = prevContent ? coreContent(prevContent) : null
            let nextContent = sortedNote[postIndex - 1] || null
            let next = nextContent ? coreContent(nextContent) : null
            let post = sortedNote.find((p) => p.slug === slug)
            
            return {
                post,
                prev,
                next,
            }
    }

}

export default async function PostPage({ params }) {
    const { post, prev, next } = await getPost({ params })
    return (
        <>
            {'draft' in post && post.draft === true ? (
                <div className="mt-24 text-center">
                    <PageTitle>
                        Under Construction{' '}
                        <span role="img" aria-label="roadwork sign">
                            🚧
                        </span>
                    </PageTitle>
                </div>
            ) : (
                <MDXRender post={post} prev={prev} next={next} />
            )}
        </>
    )
}
