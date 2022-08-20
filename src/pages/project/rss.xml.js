import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../config';

const articleImportResult = import.meta.glob('./*.mdx', { eager: true })
const articles = Object.values(articleImportResult)

export const get = () =>
	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: articles.map((article) => ({
			link: article.url,
			title: article.frontmatter.title,
			pubDate: article.frontmatter.updated
		}))
	});
