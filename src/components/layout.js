import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Toggle from "../components/toggle"

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
      query BioQuery {
        site {
          siteMetadata {
            author {
              name
              summary
            }
            social {
              linkedin
            }
          }
        }
      }
    `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header = null

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        {title}
      </h1>
    )
  }

  return (
    <>
      <Toggle />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} | {` `}
          <a href={`https://www.linkedin.com/in/${social?.linkedin || ``}`}
            target="_blank"
            rel="noopener noreferrer">Marcio José Lisboa
          </a>
        </footer>
      </div>
    </>
  )
}

export default Layout
