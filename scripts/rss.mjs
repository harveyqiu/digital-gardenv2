import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { escape } from "pliny/utils/htmlEscaper.js";
import { writeFileSync } from 'fs';

var generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.description && `<description>${escape(post.description)}</description>`}
    <pubDate>${new Date(post.updatedDate).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`;
var generateRss = (config, posts, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].updatedDate).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join("")}
    </channel>
  </rss>
`;
async function generateRSS(config, allBlogs) {
  const publishPosts = allBlogs.filter((post) => post.draft !== true);
  if (publishPosts.length > 0) {
    const rss = generateRss(config, publishPosts);
    writeFileSync("./public/feed.xml", rss);
  }
}

const rss = () => {
  generateRSS(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
