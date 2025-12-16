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
