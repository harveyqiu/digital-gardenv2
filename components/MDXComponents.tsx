/* eslint-disable react/display-name */
import React from 'react'
// import TOCInline from 'pliny/ui/TOCInline'
// import Pre from 'pliny/ui/Pre'

import Image from './Image'
import CustomLink from './Link'

// Temporary fallback components
const TOCInline = ({ toc, ...props }: any) => <div>TOC placeholder</div>
const Pre = ({ children, ...props }: any) => <pre {...props}>{children}</pre>

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
