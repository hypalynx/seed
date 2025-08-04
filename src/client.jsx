import { h, hydrate } from 'preact'
import { Router } from 'wouter-preact'
import { App } from './App.jsx'

hydrate(h(Router, {}, h(App)), document.getElementById('app'))

if (process.env.NODE_ENV === 'development') {
  let manifest = null

  const reload = async () => {
    try {
      const newManifest = await fetch('/assets-manifest.json').then(r =>
        r.json(),
      )

      if (!manifest) {
        manifest = newManifest
        return
      }

      if (newManifest.styles !== manifest.styles) {
        console.log('🎨 CSS hot-swap')
        document.querySelector('link[href*="styles."]').href =
          `/assets/${newManifest.styles}`
        manifest.styles = newManifest.styles
      }

      if (newManifest.client !== manifest.client) {
        console.log('🔄 JS reload')
        location.reload()
      }
    } catch (e) {}
  }

  setInterval(reload, 500)
}
