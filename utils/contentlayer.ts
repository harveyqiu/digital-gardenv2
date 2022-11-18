// Original codes are from "https://github.com/timlrx/pliny/blob/main/packages/pliny/src/utils/contentlayer.ts".
// I edit some lines to suit my personal usage.

import GithubSlugger from 'github-slugger'
import type { Blog, Note } from 'contentlayer/generated'
import type { Document, DocumentMeta, MDX } from 'contentlayer/core'

export type MDXDocument = Document & { body: MDX }

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortedPosts(posts: Blog[] | Note[]): Blog[] | Note[] {
  return posts.sort((a: Blog | Note, b: Blog | Note) => dateSortDesc(a.updatedDate, b.updatedDate))
}

export async function getAllTags(allPosts: Blog[] | Note[]) {
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

type ConvertUndefined<T> = OrNull<{
  [K in keyof T as undefined extends T[K] ? K : never]-?: T[K]
}>
type OrNull<T> = { [K in keyof T]: Exclude<T[K], undefined> | null }
type PickRequired<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>

/**
 * A typesafe omit helper function
 * @example pick(content, ['title', 'description'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {ConvertPick<{ [K in Keys]: Obj[K] }>}
 */
export const pick = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
): ConvertPick<{ [K in Keys]: Obj[K] }> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key] ?? null
    return acc
  }, {} as any)
}

/**
 * A typesafe omit helper function
 * @example omit(content, ['body', '_raw', '_id'])
 *
 * @param {Obj} obj
 * @param {Keys[]} keys
 * @return {*}  {Omit<Obj, Keys>}
 */
export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const result = Object.assign({}, obj)
  keys.forEach((key) => {
    delete result[key]
  })
  return result
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>

export function coreContent<T extends MDXDocument>(content: T) {
  return omit(content, ['body', '_raw', '_id'])
}

export function allCoreContent<T extends MDXDocument>(contents: T[]) {
  return contents.map((c) => coreContent(c)).filter((c) => !('draft' in c && c.draft === true))
}
