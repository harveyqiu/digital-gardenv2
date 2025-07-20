/* eslint-disable react/display-name */
import React from 'react'
// import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'

import Image from './Image'
import CustomLink from './Link'

// Temporary TOCInline component
const TOCInline = ({ toc, fromHeading = 1, toHeading = 6, asDisclosure = false, exclude = '', collapse = false, ulClassName = '', liClassName = '' }: any) => {
  if (!toc || !Array.isArray(toc)) {
    return null
  }
  
  const re = Array.isArray(exclude) 
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i') 
    : new RegExp('^(' + exclude + ')$', 'i')
  
  const filteredToc = toc.filter(
    (heading: any) => heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )
  
  const createList = (items: any[]) => {
    if (!items || items.length === 0) {
      return null
    }
    
    return (
      <ul className={ulClassName}>
        {items.map((item, index) => (
          <li key={index} className={liClassName}>
            <a href={item.url}>{item.value}</a>
          </li>
        ))}
      </ul>
    )
  }
  
  return asDisclosure ? (
    <details open={!collapse}>
      <summary className="ml-6 pb-2 pt-2 text-xl font-bold">Table of Contents</summary>
      <div className="ml-6">{createList(filteredToc)}</div>
    </details>
  ) : (
    createList(filteredToc)
  )
}

export const Wrapper = ({ layout, content, ...rest }: any) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

export default MDXComponents
