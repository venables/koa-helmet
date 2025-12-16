import helmet, { type HelmetOptions } from "helmet"
import { type Middleware } from "koa"
import { promisify } from "node:util"

export type KoaMiddleware = Middleware & { _name?: string }

export type Helmet = typeof helmet
export type HelmetMethod = Helmet[keyof Helmet]

export type KoaHelmet = {
  [HelmetMiddleware in keyof Helmet]: (
    ...options: Parameters<Helmet[HelmetMiddleware]>
  ) => Middleware
} & ((options?: HelmetOptions) => Middleware)

function koaHelmet(...args: Parameters<Helmet>): KoaMiddleware {
  const helmetPromise = promisify(helmet(...args))
  const middleware: KoaMiddleware = (ctx, next) => helmetPromise(ctx.req, ctx.res).then(next)
  middleware._name = "helmet"
  return middleware
}

for (const [key, method] of Object.entries(helmet)) {
  if (key === "default" || typeof method !== "function") {
    continue
  }

  const koaMethod = (...args: Parameters<typeof method>) => {
    const methodPromise = promisify(method(...args))
    const middleware: KoaMiddleware = (ctx, next) => methodPromise(ctx.req, ctx.res).then(next)
    return middleware
  }

  Object.assign(koaMethod, method)
  ;(koaHelmet as KoaHelmet)[key as keyof Helmet] = koaMethod
}

export default koaHelmet as KoaHelmet
