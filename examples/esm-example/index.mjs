import Koa from "koa"
import helmet from "koa-helmet"

const app = new Koa()

app.use(helmet())
app.use(async (ctx) => {
  ctx.body = "Hello World"
})

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`)
})
