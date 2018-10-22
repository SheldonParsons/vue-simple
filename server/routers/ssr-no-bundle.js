const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render-no-bundle')
const path = require('path')
const fs = require('fs')
const bundle = require('../../server-build/server-entry').default

const clientManifest = require('../../public/vue-ssr-client-manifest.json')
const renderer = VueServerRenderer.createRenderer(
  {
    inject: false,
    clientManifest
  }
)

// fs读取模板文件
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async(ctx) => {
  await serverRender(ctx, renderer, template, bundle)
})

module.exports = pageRouter
