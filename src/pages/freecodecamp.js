import * as React from "react"
import { useEffect, useState } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const FreeCodeCamp = ({ location }) => {
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFreeCodeCampData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetch("/.netlify/functions/freecodecamp")

        if (!result.ok) {
          throw new Error(`HTTP ${result.status}`)
        }

        setResponse(await result.json())
      } catch (requestError) {
        console.error("Error fetching FreeCodeCamp data:", requestError)
        setResponse(null)
        setError("Error fetching FreeCodeCamp data")
      } finally {
        setIsLoading(false)
      }
    }

    loadFreeCodeCampData()
  }, [])

  const freeCodeCampTitleAndDescription = (
    <header className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mt-0 mb-3 text-4xl font-extrabold text-gray-900 dark:text-white">
        📚 Artigos para aprender e explorar
      </h1>
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        Reuni aqui alguns dos artigos mais recentes do freeCodeCamp: 💡 ideias,
        tutoriais e guias práticos para despertar a curiosidade e tornar o
        aprendizado de programação mais leve.
      </p>
      <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
        A lista é atualizada diariamente com novos artigos ✨. Explore os resumos
        abaixo, descubra um assunto novo e siga o link para ler o artigo
        completo, no seu ritmo.
      </p>
      <p className="mt-4 mb-0 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        Uma curiosidade 🤔: sabe como essa lista foi criada? Uma Serverless
        Function da Netlify busca os artigos no freeCodeCamp, organiza as
        informações e entrega tudo para a página montar os cards
        automaticamente.
      </p>
    </header>
  )

  const freeCodeCampCards = Array.isArray(response)
    ? response.map(articleContent => (
        <article
          key={articleContent.url || articleContent.title}
          className="freecodecamp-card w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
        >
          {articleContent.imgLink && (
            <img
              className="h-auto w-full object-contain"
              src={articleContent.imgLink}
              alt={articleContent.title || "Article image"}
            />
          )}
          <div className="p-5">
            <h2 className="mt-0 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {articleContent.title}
            </h2>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {articleContent.resume}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {articleContent.authorImg && (
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={articleContent.authorImg}
                  alt={articleContent.author || "Author"}
                />
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900 dark:text-white">
                  {articleContent.author || "Unknown"}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {articleContent.timePassed}
                  {articleContent.date && (
                    <time dateTime={articleContent.date}>
                      {` - ${new Date(articleContent.date).toLocaleDateString()}`}
                    </time>
                  )}
                </p>
              </div>
            </div>
            <a
              href={articleContent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full justify-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Read more
            </a>
          </div>
        </article>
      ))
    : null

  return (
    <Layout location={location} title="FreeCodeCamp">
      {freeCodeCampTitleAndDescription}
      <div id="feed-display" className="mt-4 flex flex-col gap-4">
        {isLoading ? (
          <div
            className="flex items-center justify-center gap-2 py-10"
            role="status"
            aria-label="Carregando artigos"
          >
            <span className="h-3 w-3 animate-[bounce_0.6s_ease-in-out_infinite] rounded-full bg-blue-600 [animation-delay:-0.2s]" />
            <span className="h-3 w-3 animate-[bounce_0.6s_ease-in-out_infinite] rounded-full bg-blue-600 [animation-delay:-0.1s]" />
            <span className="h-3 w-3 animate-[bounce_0.6s_ease-in-out_infinite] rounded-full bg-blue-600" />
          </div>
        ) : (
          freeCodeCampCards
        )}
      </div>
    </Layout>
  )
}

export default FreeCodeCamp

export const Head = () => (
  <Seo title="Up and Running with Serverless Functions" />
)
