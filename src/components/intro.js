/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Intro = () => {
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

  return (
    <div className="intro">
      <h2>Olá!👋🏻</h2>
      <p>
        Vivemos tempos em que é fácil se perder na pressa, nas opiniões prontas e nas respostas automáticas. Mas a filosofia, seja a de Sócrates, Sêneca, Allan Kardec, ou qualquer outro autor, sempre nos convida a algo mais simples e essencial: <strong>pensar por conta própria</strong>.
      </p>
      <p>
        Este espaço nasce do desejo de <strong>retomar o hábito da reflexão</strong>. Não é um refúgio de certezas, mas um campo de perguntas. Aqui, as ideias se encontram com a experiência cotidiana, a espiritualidade dialoga com a razão e o pensamento filosófico se torna ferramenta para compreender e <strong>transformar a própria existência</strong>.
      </p>
      <p>
        Os textos que você encontrará aqui são ensaios breves, escritos para provocar, inspirar e às vezes incomodar. Afinal, refletir é também <strong>sair do conforto do pensamento comum</strong>.
      </p>
      <p>
        Sinta-se à vontade para duvidar, concordar ou discordar.
        Porque o objetivo aqui não é convencer — é <strong>despertar</strong>.
      </p>
    </div>
  )
}

export default Intro
