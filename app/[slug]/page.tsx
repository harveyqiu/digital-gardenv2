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
            let blog = sortedBlog.find((p) => p.slug === slug)
            
            return {
                post:blog,
            }
        case 'note':
            let post = sortedNote.find((p) => p.slug === slug)
            
            return {
                post
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
                <MDXRender post={post} />
            )}
        </>
    )
}
