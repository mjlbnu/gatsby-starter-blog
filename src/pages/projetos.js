import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Projetos = ({ data, location }) => {
    const siteTitle = `Projetos`
    const posts = data.allMarkdownRemark.nodes
    const title = "Projetos"

    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Bio />
                <p>
                    No blog posts found. Add markdown posts to "content/blog" (or the
                    directory you specified for the "gatsby-source-filesystem" plugin in
                    gatsby-config.js).
                </p>
            </Layout>
        )
    }

    return (
        <Layout location={location} title={siteTitle}>
            <h1 className="main-heading">{ title }</h1>
            <p>
                This means that you can create and write <code>.ts/.tsx</code> files for
                your pages, components, and <code>gatsby-*</code> configuration files (for
                example <code>gatsby-config.ts</code>).
            </p>
        </Layout>
    )
}

export default Projetos

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
