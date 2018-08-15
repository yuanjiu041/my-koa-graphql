import koa from 'koa'
import koaBody from 'koa-body'
import initRouter from './router'
import { database } from '../mongodb'

const app = new koa()

database()

app.use(koaBody())

initRouter(app)

app.listen(3000, () => {
  console.log('localhost:3000')
})
