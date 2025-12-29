import Koa from "koa"
import request from "supertest"
import { test, expect } from "vitest"

import helmet from ".."

test("works with the default helmet call", async () => {
  const app = new Koa()
  app.use(helmet())
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")

    // contentSecurityPolicy
    .expect(
      "Content-Security-Policy",
      "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    )

    // crossOriginOpenerPolicy
    .expect("Cross-Origin-Opener-Policy", "same-origin")

    // crossOriginResourcePolicy
    .expect("Cross-Origin-Resource-Policy", "same-origin")

    // dnsPrefetchControl
    .expect("X-DNS-Prefetch-Control", "off")

    // frameguard
    .expect("X-Frame-Options", "SAMEORIGIN")

    // hsts
    .expect("Strict-Transport-Security", /max-age=\d+; includeSubDomains/)

    // ieNoOpen
    .expect("X-Download-Options", "noopen")

    // noSniff
    .expect("X-Content-Type-Options", "nosniff")

    // referrerPolicy
    .expect("referrer-policy", "no-referrer")

    // permittedCrossDomainPolicies
    .expect("x-permitted-cross-domain-policies", "none")

    // xssFilter
    .expect("X-Xss-Protection", "0")

    .expect(200)
})

test("sets individual headers properly", async () => {
  const app = new Koa()
  app.use(helmet.hsts())
  app.use(helmet.contentSecurityPolicy())
  app.use(helmet.crossOriginEmbedderPolicy())
  app.use(helmet.crossOriginOpenerPolicy())
  app.use(helmet.crossOriginResourcePolicy())
  app.use(
    helmet.dnsPrefetchControl({
      allow: false,
    }),
  )
  app.use(helmet.ieNoOpen())
  app.use(helmet.referrerPolicy())
  app.use(helmet.xssFilter())
  app.use(helmet.frameguard({ action: "deny" }))
  app.use(helmet.noSniff())
  app.use(helmet.permittedCrossDomainPolicies())

  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")

    // contentSecurityPolicy
    .expect(
      "Content-Security-Policy",
      "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    )

    // crossOriginEmbedderPolicy
    .expect("Cross-Origin-Embedder-Policy", "require-corp")

    // crossOriginOpenerPolicy
    .expect("Cross-Origin-Opener-Policy", "same-origin")

    // crossOriginResourcePolicy
    .expect("Cross-Origin-Resource-Policy", "same-origin")

    // dnsPrefetchControl
    .expect("X-DNS-Prefetch-Control", "off")

    // referrerPolicy
    .expect("referrer-policy", "no-referrer")

    // ieNoOpen
    .expect("X-Download-Options", "noopen")

    // hsts
    .expect("Strict-Transport-Security", /max-age=\d+; includeSubDomains/)

    // frameguard
    .expect("X-Frame-Options", "DENY")

    // noSniff
    .expect("X-Content-Type-Options", "nosniff")

    // permittedCrossDomainPolicies
    .expect("X-Permitted-Cross-Domain-Policies", "none")
})

test("re-exports middleware exports", () => {
  expect("getDefaultDirectives" in helmet.contentSecurityPolicy).toBeTruthy()
  expect("dangerouslyDisableDefaultSrc" in helmet.contentSecurityPolicy).toBeTruthy()
})

test("helmet() accepts options to disable middlewares", async () => {
  const app = new Koa()
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginOpenerPolicy: false,
      xssFilter: false,
    }),
  )
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  const res = await request(app.callback()).get("/")

  expect(res.headers["content-security-policy"]).toBeUndefined()
  expect(res.headers["cross-origin-opener-policy"]).toBeUndefined()
  expect(res.headers["x-xss-protection"]).toBeUndefined()

  // other headers should still be set
  expect(res.headers["x-frame-options"]).toBe("SAMEORIGIN")
  expect(res.headers["x-content-type-options"]).toBe("nosniff")
})

test("helmet() accepts custom options for middlewares", async () => {
  const app = new Koa()
  app.use(
    helmet({
      frameguard: { action: "deny" },
      referrerPolicy: { policy: "strict-origin" },
      crossOriginResourcePolicy: { policy: "cross-origin" },
      hsts: { maxAge: 123456, includeSubDomains: false },
    }),
  )
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")
    .expect("X-Frame-Options", "DENY")
    .expect("referrer-policy", "strict-origin")
    .expect("Cross-Origin-Resource-Policy", "cross-origin")
    .expect("Strict-Transport-Security", "max-age=123456")
    .expect(200)
})

test("contentSecurityPolicy accepts custom directives", async () => {
  const app = new Koa()
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "cdn.example.com"],
        imgSrc: ["*"],
      },
    }),
  )
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  const res = await request(app.callback()).get("/")
  const csp = res.headers["content-security-policy"]

  expect(csp).toContain("default-src 'self'")
  expect(csp).toContain("script-src 'self' cdn.example.com")
  expect(csp).toContain("img-src *")
  expect(res.status).toBe(200)
})

test("hsts accepts custom options", async () => {
  const app = new Koa()
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }),
  )
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")
    .expect("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
    .expect(200)
})

test("crossOriginOpenerPolicy accepts policy option", async () => {
  const app = new Koa()
  app.use(helmet.crossOriginOpenerPolicy({ policy: "same-origin-allow-popups" }))
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")
    .expect("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
    .expect(200)
})

test("dnsPrefetchControl allows prefetching when enabled", async () => {
  const app = new Koa()
  app.use(helmet.dnsPrefetchControl({ allow: true }))
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback()).get("/").expect("X-DNS-Prefetch-Control", "on").expect(200)
})

test("permittedCrossDomainPolicies accepts policy option", async () => {
  const app = new Koa()
  app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: "by-content-type" }))
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")
    .expect("X-Permitted-Cross-Domain-Policies", "by-content-type")
    .expect(200)
})

test("referrerPolicy accepts multiple policies", async () => {
  const app = new Koa()
  app.use(helmet.referrerPolicy({ policy: ["no-referrer", "strict-origin-when-cross-origin"] }))
  app.use((ctx) => {
    ctx.body = "Hello world!"
  })

  await request(app.callback())
    .get("/")
    .expect("referrer-policy", "no-referrer,strict-origin-when-cross-origin")
    .expect(200)
})
