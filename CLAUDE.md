# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal digital garden built with Next.js 15, TypeScript, Tailwind CSS, and Contentlayer. The site hosts both blog posts (`/blog`) and notes (`/note`) with a dual content structure supporting both formal articles and garden-style notes. The site is hosted at https://garden.harveyqiu.xyz.

## Development Commands

### Core Development
- `npm run dev` - Start development server with proper environment setup
- `npm run build` - Build for production (includes postbuild scripts for RSS, sitemap, search)
- `npm run serve` - Start production server
- `npm run lint` - Run ESLint

### Additional Commands
- `npm run analyze` - Bundle analysis with webpack-bundle-analyzer
- Post-build scripts automatically generate RSS feeds, sitemaps, and search indices

## Content Architecture

### Content Types
- **Blog posts**: Located in `data/blog/`, formal articles with full frontmatter
- **Notes**: Located in `data/garden/`, personal garden-style notes
- Both support MDX with enhanced plugins

### Contentlayer Configuration
Content is processed through Contentlayer with extensive plugin support:
- **Remark plugins**: GFM, math, code titles, image processing, wiki links
- **Rehype plugins**: Slug generation, autolink headings, KaTeX, citations, syntax highlighting
- Custom frontmatter extraction and TOC generation

### Frontmatter Structure
**Blog posts**:
```yaml
title: string (required)
createdDate: date (required)
updatedDate: date (required)
tags: string[]
draft: boolean
description: string
images: string[]
layout: string
bibliography: string
canonicalUrl: string
```

**Notes**:
```yaml
title: string (required)
createdDate: date (required)
updatedDate: date (required)
tags: string[]
description: string
```

## Key File Locations

### Configuration
- `contentlayer.config.ts` - Content processing and MDX plugins
- `next.config.js` - Next.js config with security headers and Contentlayer integration
- `tailwind.config.js` - Tailwind configuration with custom typography
- `data/siteMetadata.js` - Site configuration and metadata

### Core Components
- `app/layout.tsx` - Root layout with theme support
- `components/MDXComponents.tsx` - Custom MDX component mappings
- `utils/contentlayer.ts` - Content utilities and type helpers

### Build Scripts
- `scripts/postbuild.mjs` - Orchestrates RSS, sitemap, and search generation
- `scripts/rss.mjs` - RSS feed generation for blog posts
- `scripts/sitemap.mjs` - Sitemap generation
- `scripts/search.mjs` - Search index generation

## Architecture Notes

### Routing Structure
- App Router with dynamic routes: `[slug]`, `[page]`, `[tag]`
- Separate paginated views for blog (`/blog/[page]`) and notes (`/note/[page]`)
- Tag-based filtering at `/tags/[tag]`

### Content Processing Flow
1. Contentlayer processes markdown/MDX files from `data/` directories
2. Custom remark/rehype plugins enhance content (wiki links, citations, syntax highlighting)
3. Generated content includes computed fields (reading time, TOC, slugs)
4. Build process generates static assets (RSS, sitemap, search index)

### Theme System
- Uses next-themes for dark/light mode switching
- Custom Tailwind typography with dark mode variants
- Teal color scheme as primary brand color

### Security
Next.js security headers configured including CSP, HSTS, and frame protection suitable for a personal blog with comment integration (Giscus).

## Development Notes

- Content is sorted by `updatedDate` in descending order
- Draft posts are filtered out in production builds
- Wiki-style linking supported between notes
- Math rendering via KaTeX
- Code syntax highlighting with Prism
- Image processing includes size detection and JSX conversion