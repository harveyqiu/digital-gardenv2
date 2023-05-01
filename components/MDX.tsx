'use client'

import { MDXComponents } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

const DEFAULT_LAYOUT = 'PostLayout'

export default function MDXRender({post}) {
  return (
    <MDXLayoutRenderer
      layout={post.layout || DEFAULT_LAYOUT}
      content={post}
      MDXComponents={MDXComponents}
      toc={post.toc}
    />
  )
}
