const helmet = require("koa-helmet")
const Koa = require("koa")

const app = new Koa()

app.use(helmet())
app.use(async (ctx) => {
  ctx.body = "Hello World"
})

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`)
})
