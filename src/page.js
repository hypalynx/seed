export function createHTML(
  appHtml = '',
  { title = 'Stack', assetBase = '/assets', manifest = {} } = {},
) {
  // Use actual asset names or fallback to original names
  const cssFile = manifest.styles || 'styles.css'
  const jsFile = manifest.client || 'client.js'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="icon" type="image/svg+xml" href="${assetBase}/favicon.svg">
  <link rel="stylesheet" href="${assetBase}/${cssFile}">
</head>
<body>
  <div id="app" class="min-h-screen">${appHtml}</div>
  <script type="module" src="${assetBase}/${jsFile}"></script>
</body>
</html>`
}
