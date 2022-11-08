import { MDXLayoutRenderer } from 'pliny/mdx-components'
import PageTitle from '@/components/PageTitle'
import { MDXComponents } from '@/components/MDXComponents'
import { coreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { allNotes } from 'contentlayer/generated'
import type { Note } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths() {
  return {
    paths: allNotes.map((p) => ({ params: { slug: p.slug.split('/') } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const sortedNotes = allNotes as Note[]
  const postIndex = sortedNotes.findIndex((p) => p.slug === slug)
  const prevContent = sortedNotes[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedNotes[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const note = sortedNotes.find((p) => p.slug === slug)

  return {
    props: {
      note,
      prev,
      next,
    },
  }
}

export default function NotePostPage({
  note,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
        <MDXLayoutRenderer
          layout={DEFAULT_LAYOUT}
          content={note}
          MDXComponents={MDXComponents}
          toc={note.toc}
          prev={prev}
          next={next}
        />
    </>
  )
}
