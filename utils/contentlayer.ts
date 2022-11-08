import GithubSlugger from 'github-slugger'
import type { Blog } from 'contentlayer/generated'
import type { Document, MDX } from 'contentlayer/core'

export type MDXDocument = Document & { body: MDX }

export function dateSortDesc(a: string, b: string) {
    if (a > b) return -1
    if (a < b) return 1
    return 0
  }

export function sortedBlogPost(allBlogs: MDXDocument[]) {
    return allBlogs.sort((a, b) => dateSortDesc(a.updatedDate, b.updatedDate))
  }

export async function getAllTags(allBlogs: Blog[]) {
    const tagCount: Record<string, number> = {}
  
    // Iterate through each post, putting all found tags into `tags`
    allBlogs.forEach((file) => {
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