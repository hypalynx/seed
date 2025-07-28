export function createHTML(
  appHtml = '',
  { title = 'Stack', assetBase = '/assets', assets = {} } = {},
) {
  // Use actual asset names or fallback to original names
  const cssFile = assets.styles || 'styles.css'
  const jsFile = assets.client || 'client.js'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="${assetBase}/${cssFile}">
</head>
<body>
  <div id="app" class="min-h-screen">${appHtml}</div>
  <script type="module" src="${assetBase}/${jsFile}"></script>
</body>
</html>`
}
