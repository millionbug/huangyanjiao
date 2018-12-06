module.exports = function (html) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="/renderStatic/index.css" />
  </head>
  <body>
    <div id="app" class="blog">
      <div class="header">
      </div>
      <div class="footer">
        ${html}
      </div>
    </div>
    <script src="/renderStatic/webpackOutPut/serverRenderBlog.js"></script>
  </body>
  </html>
  `
}