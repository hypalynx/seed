import { h, hydrate } from 'preact'
import { Router } from 'wouter-preact'
import { App } from './App.jsx'

hydrate(h(Router, {}, h(App)), document.getElementById('app'))

if (process.env.NODE_ENV === 'development') {
  console.log('starting hot-reload')
  let manifest = null
  const eventSource = new EventSource('/dev/events')

  eventSource.addEventListener('hot-reload', event => {
    const newManifest = JSON.parse(event.data)
    console.log(newManifest)

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
  })
}
