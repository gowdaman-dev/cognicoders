import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resolveSeo, SITE } from '../data/seo'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function SeoManager() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = resolveSeo(pathname)

    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords.join(', '))
    upsertLink('canonical', seo.canonical)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', SITE.name)
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', seo.canonical)
    upsertMeta('property', 'og:image', `${SITE.url}/og.png`)
    upsertMeta('property', 'og:locale', 'en_IN')

    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seoJsonld = 'true'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(seo.jsonLd)
  }, [pathname])

  return null
}