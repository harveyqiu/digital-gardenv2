// Original codes are from "https://github.com/timlrx/pliny/blob/main/packages/pliny/src/utils/contentlayer.ts".
// I edit some lines to suit my personal usage.

import GithubSlugger from 'github-slugger'
import type { Blog } from 'contentlayer/generated'
import type { Document, MDX } from 'contentlayer/core'

export type MDXDocument = Document & { body: MDX }

export function dateSortDesc(a: string, b: string) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
  }

export function sortedPosts(posts: MDXDocument[]) {
    return posts.sort((a, b) => dateSortDesc(a.updatedDate, b.updatedDate))
  }

export async function getAllTags(allPosts: Blog[]) {
    const tagCount: Record<string, number> = {}
  
    // Iterate through each post, putting all found tags into `tags`
    allPosts.forEach((file) => {
      if (file.tags && file.draft !== true) {
        file.tags.forEach((tag) => {
          const formattedTag = GithubSlugger.slug(tag)
          if (formattedTag in tagCount) {
            tagCount[formattedTag] += 1
          } else {
            tagCount[formattedTag] = 1
          }
        })
      }
    })
  
    return tagCount
  }