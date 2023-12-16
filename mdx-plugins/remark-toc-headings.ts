// Original codes are from "https://github.com/timlrx/pliny/
import { VFile } from 'vfile'
import { Parent, Node } from 'unist'
import { Heading } from 'mdast'
import { visitParents } from 'unist-util-visit-parents'
import slugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'

export type Toc = {
  value: string
  depth: number
  url: string
}[]

export function remarkTocHeadings() {
  return (tree: Parent, file: VFile) => {
    const toc: Toc = []
    visitParents(tree, 'heading', (node: Heading) => {
      const textContent = toString(node)
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
        depth: node.depth,
      })
    })
    file.data.toc = toc
  }
}

/**
 * Passes markdown file through remark to extract TOC headings
 *
 * @param {string} markdown
 * @return {*}  {Promise<Toc>}
 */
export async function extractTocHeadings(markdown: string): Promise<Toc> {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
//   console.log(vfile.data.toc)
  // @ts-ignore
  return vfile.data.toc
}