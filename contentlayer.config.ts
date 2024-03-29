import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import remarkExtractFrontmatter from './mdx-plugins/remark-extract-frontmatter';
import  remarkCodeTitles from './mdx-plugins/remark-code-titles';
import remarkImgToJsx from './mdx-plugins/remark-img-to-jsx'
import { extractTocHeadings } from './mdx-plugins/remark-toc-headings'

// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

import wikiLinkPlugin from 'remark-wiki-link-plus';

const root = process.cwd()

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: 'garden/**/*.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    createdDate: { type: 'date', required: true },
    updatedDate: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    description: { type: 'string' },
  },
  computedFields,
}))

// const const Handbook = defineDocumentType(() => ({
//     name: 'Handbook',
//     filePathPattern: 'handbook/**/*.md',
//     contentType: 'mdx',
//     fields: {
//       title: { type: 'string', required: true },
//       createdDate: { type: 'date', required: true },
//       updatedDate: { type: 'date', required: true },
//       tags: { type: 'list', of: { type: 'string' } },
//       draft: { type: 'boolean' },
//       description: { type: 'string' },
//       images: { type: 'list', of: { type: 'string' } },
//       layout: { type: 'string' },
//     },
//     computedFields,
// }))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    createdDate: { type: 'date', required: true },
    updatedDate: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    draft: { type: 'boolean' },
    description: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Note],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      wikiLinkPlugin
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
})
