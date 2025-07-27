export function createHTML(
  appHtml = '',
  { title = 'Stack', assetBase = '/assets' } = {},
) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="${assetBase}/styles.css">
</head>
<body>
  <div id="app" class="min-h-screen">${appHtml}</div>
  <script type="module" src="${assetBase}/client.js"></script>
</body>
</html>`
}
