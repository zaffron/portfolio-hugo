# Avinash Rijal - Personal Portfolio & Blog

A modern, fast personal portfolio and blog built with Hugo and Tailwind CSS. Deployed on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/9285bbd8-d22a-441e-8a55-1d9eb0328f15/deploy-status)](https://app.netlify.com/projects/zaffron/deploys)

## Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/) v0.153.3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4
- **Typography**: [@tailwindcss/typography](https://github.com/tailwindcss/typography)
- **Build Tools**: PostCSS, Autoprefixer
- **Deployment**: Netlify
- **CMS**: Decap CMS (formerly Netlify CMS)

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- Hugo Extended v0.153.3 or higher
- npm or yarn

## Local Development

### Installation

```bash
# Install dependencies
npm install
```

### Running the Development Server

```bash
# Standard Hugo development server
hugo server

# Development with CMS and hot reload
npm run dev:cms

# CMS proxy only
npm run cms:proxy
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the site
hugo --gc --minify
```

The built site will be in the `public/` directory.

## Project Structure

```
.
├── assets/          # CSS, JS, and other assets
├── config/          # Hugo configuration files
│   ├── _default/    # Default configuration
│   ├── development/ # Development environment config
│   └── production/  # Production environment config
├── content/         # Markdown content files
│   └── posts/       # Blog posts
├── data/            # Data files for Hugo
├── layouts/         # HTML templates
├── public/          # Generated static site (gitignored)
├── netlify.toml     # Netlify deployment configuration
└── package.json     # Node.js dependencies
```

## Configuration

### Hugo Configuration

Main configuration files are located in `config/_default/`:

- `hugo.toml` - Base Hugo configuration
- `params.toml` - Site parameters and metadata
- `menus.toml` - Navigation menus
- `markup.toml` - Markdown rendering settings
- `related.toml` - Related content configuration

### Tailwind CSS

Tailwind configuration is managed through:

- `postcss.config.mjs` - PostCSS configuration
- Hugo's build stats for purging unused CSS

## Deployment

The site is configured for automatic deployment on Netlify:

- **Production**: Automatically deploys from `main` branch
- **Preview Deployments**: Available for pull requests
- **Branch Deploys**: Automatically deploy from all branches

### Environment Variables

The following environment variables are configured in `netlify.toml`:

- `HUGO_VERSION`: 0.153.3
- `HUGO_ENV`: production
- `HUGO_ENABLEGITINFO`: true

## Content Management

### Creating New Posts

```bash
hugo new posts/my-new-post.md
```

Or use the Decap CMS interface at `/admin` when running the development server.

### Content Organization

- **Posts**: Located in `content/posts/`
- **Taxonomies**: Categories, tags, and series
- **Permalinks**: Posts use `/posts/:year/:slug/` format

## Performance & SEO

- Image optimization with Hugo's built-in processing
- Cache headers configured for static assets (1 year)
- Security headers (X-Frame-Options, CSP, etc.)
- Sitemap and RSS feed generation
- OpenGraph and Twitter Card support

## Author

**Avinash Rijal**

- Website: [avinashrijal.com.np](https://avinashrijal.com.np/)
- GitHub: [@zaffron](https://github.com/zaffron)
- Twitter: [@avinashrijal](https://twitter.com/avinashrijal)
- LinkedIn: [dev-avinash-rijal](https://linkedin.com/in/dev-avinash-rijal/)

## License

All rights reserved.
