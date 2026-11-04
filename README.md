[![Netlify Status](https://api.netlify.com/api/v1/badges/774d3660-c51f-4173-ad1b-c3aff577961e/deploy-status)](https://app.netlify.com/sites/marciolisboa/deploys)

# Personal Website & Digital Garden

A personal website and digital garden built with **Gatsby**, based on the official [Gatsby Starter Blog](https://github.com/gatsbyjs/gatsby-starter-blog) open-source project.

The website serves as a personal space to showcase projects, share knowledge, publish articles, and explore ideas related to software development, technology, philosophy, and other interests.

🌐 **Live Website:** [https://www.programadorbr.com.br/](https://www.programadorbr.com.br/)

## About the Project

This project started with the official Gatsby Starter Blog template, which provides a foundation for building modern, fast, and static websites.

The original open-source template was customized and extended to create a personal website with a digital garden concept, combining personal information, software development projects, and a blog.

The goal is to maintain an evolving space for sharing knowledge, documenting experiences, and publishing ideas.

## Technologies

The project uses the following technologies and tools:

| Technology | Purpose |
|---|---|
| **JavaScript** | Application logic and configuration |
| **React** | Component-based user interface |
| **Gatsby 5** | Static site generation and application framework |
| **GraphQL** | Querying and managing content data |
| **Markdown** | Writing and managing blog posts |
| **Tailwind CSS** | Utility-first CSS styling |
| **PostCSS** | CSS processing |
| **PrismJS** | Syntax highlighting for code snippets |
| **Node.js / npm** | Runtime and dependency management |
| **Netlify** | Deployment and hosting integration |

## Main Features

- Personal website and professional presentation.
- Digital garden for organizing and sharing ideas.
- Blog with Markdown-based content.
- Software development articles and technical notes.
- Project showcase.
- Responsive user interface.
- Static site generation for performance and SEO.
- RSS feed support.

## Project Structure

```text
.
├── content/
│   └── blog/             # Blog posts and Markdown content
├── netlify/
│   └── functions/        # Netlify serverless functions
├── src/
│   ├── components/       # Reusable React components
│   ├── images/           # Website images and assets
│   ├── pages/            # Website pages
│   └── templates/        # Page templates
├── static/               # Static assets
├── gatsby-config.js      # Gatsby configuration
├── gatsby-node.js        # Gatsby Node APIs
├── gatsby-browser.js     # Browser APIs
├── gatsby-ssr.js         # Server-side rendering APIs
├── package.json          # Dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/mjlbnu/gatsby-starter-blog.git

cd gatsby-starter-blog
```

Install dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run develop
```

The website will be available at:

```text
http://localhost:8000
```

### Production Build

Generate the production build:

```bash
npm run build
```

To serve the production build locally:

```bash
npm run serve
```

## Open Source Acknowledgment

This project is based on the official **Gatsby Starter Blog**, an open-source starter maintained by the Gatsby community.

Original repository:

[https://github.com/gatsbyjs/gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)

The original starter provided the initial project structure and foundation. This repository contains my personal customizations, configurations, content, and extensions.

Special thanks to the Gatsby team and open-source contributors for making this project possible.

## Author

**Marcio José Lisboa**

- Website: [programadorbr.com.br](https://www.programadorbr.com.br/)
- GitHub: [@mjlbnu](https://github.com/mjlbnu)
- LinkedIn: [linkedin.com/in/mjlbnu](https://www.linkedin.com/in/mjlbnu/)

---

*Built with Gatsby and powered by open source.*
