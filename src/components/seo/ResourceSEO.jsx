import { useEffect } from 'react'

const SITE_URL = 'https://usegreenpilot.netlify.app'

export default function ResourceSEO({
  title,
  description,
  canonicalPath,
  type = 'article',
  publishedAt,
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | GreenPilot`
      : 'Ressources | GreenPilot'

    const canonicalUrl = `${SITE_URL}${canonicalPath}`

    document.title = fullTitle

    const upsertMeta = (attribute, key, content) => {
      if (!content) return

      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`,
      )

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    }

    const upsertLink = (rel, href) => {
      let element = document.head.querySelector(
        `link[rel="${rel}"]`,
      )

      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        document.head.appendChild(element)
      }

      element.setAttribute('href', href)
    }

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:site_name', 'GreenPilot')
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)

    upsertLink('canonical', canonicalUrl)

    const existingSchema = document.head.querySelector(
      'script[data-greenpilot-article-schema]',
    )

    if (existingSchema) {
      existingSchema.remove()
    }

    if (type === 'article') {
      const schema = document.createElement('script')

      schema.type = 'application/ld+json'
      schema.dataset.greenpilotArticleSchema = 'true'

      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        datePublished: publishedAt,
        dateModified: publishedAt,
        author: {
          '@type': 'Organization',
          name: 'GreenPilot',
        },
        publisher: {
          '@type': 'Organization',
          name: 'GreenPilot',
          url: SITE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      })

      document.head.appendChild(schema)
    }

    return () => {
      const schema = document.head.querySelector(
        'script[data-greenpilot-article-schema]',
      )

      if (schema) {
        schema.remove()
      }

      document.title = 'GreenPilot'
    }
  }, [canonicalPath, description, publishedAt, title, type])

  return null
}
