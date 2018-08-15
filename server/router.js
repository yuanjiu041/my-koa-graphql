import koaRouter from 'koa-router'
import glob from 'glob'
import path from 'path'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'

export default function (app) {
  const router = new koaRouter();

  const controllerPath = path.join(__dirname, '../controllers')

  glob.sync('**/*.js', {
    cwd: controllerPath
  }).forEach(apiPath => {
    const apis = require(path.join(controllerPath, apiPath))
    Object.values(apis).forEach(item => {
      router[item.method](`/yx${item.route}`, item)
    })
  })

  router.get('/check_heart', (ctx) => {
    ctx.body = 'ok'
  })

  const schema = require('./schema')

  const handle = async (ctx, next) => {
    await graphqlKoa({
      schema
    })(ctx, next)
  }

  router.post('/graphql', handle)

  router.get('/graphql', handle)

  router.get('/graphiql', async (ctx, next) => {
    await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}