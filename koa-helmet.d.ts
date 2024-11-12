// Type definitions for koa-helmet 7.0
// Project: https://github.com/venables/koa-helmet#readme
// Definitions by: Nick Simmons <https://github.com/nsimmons>
//                 Jan Dolezel <https://github.com/dolezel>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import helmet from "helmet";
import { Middleware, Context } from "koa";

type HelmetOptions = helmet.HelmetOptions;

declare namespace koaHelmet {
  type KoaHelmetContentSecurityPolicyDirectiveFunction = (
    req?: Context["req"],
    res?: Context["res"],
  ) => string;

  type KoaHelmetCspDirectiveValue =
    | string
    | KoaHelmetContentSecurityPolicyDirectiveFunction;

  interface KoaHelmetContentSecurityPolicyDirectives {
    baseUri?: KoaHelmetCspDirectiveValue[];
    childSrc?: KoaHelmetCspDirectiveValue[];
    connectSrc?: KoaHelmetCspDirectiveValue[];
    defaultSrc?: KoaHelmetCspDirectiveValue[];
    fontSrc?: KoaHelmetCspDirectiveValue[];
    formAction?: KoaHelmetCspDirectiveValue[];
    frameAncestors?: KoaHelmetCspDirectiveValue[];
    frameSrc?: KoaHelmetCspDirectiveValue[];
    imgSrc?: KoaHelmetCspDirectiveValue[];
    mediaSrc?: KoaHelmetCspDirectiveValue[];
    objectSrc?: KoaHelmetCspDirectiveValue[];
    pluginTypes?: KoaHelmetCspDirectiveValue[];
    prefetchSrc?: KoaHelmetCspDirectiveValue[];
    reportTo?: string;
    reportUri?: string;
    sandbox?: KoaHelmetCspDirectiveValue[];
    scriptSrc?: KoaHelmetCspDirectiveValue[];
    scriptSrcAttr?: KoaHelmetCspDirectiveValue[];
    scriptSrcElem?: KoaHelmetCspDirectiveValue[];
    styleSrc?: KoaHelmetCspDirectiveValue[];
    styleSrcAttr?: KoaHelmetCspDirectiveValue[];
    styleSrcElem?: KoaHelmetCspDirectiveValue[];
    workerSrc?: KoaHelmetCspDirectiveValue[];
  }

  interface KoaHelmetContentSecurityPolicyConfiguration {
    reportOnly?: boolean;
    useDefaults?: boolean;
    directives?: KoaHelmetContentSecurityPolicyDirectives;
  }

  interface KoaHelmet {
    (options?: HelmetOptions): Middleware;
    contentSecurityPolicy(
      options?: KoaHelmetContentSecurityPolicyConfiguration,
    ): Middleware;
    crossOriginEmbedderPolicy(
      options?: HelmetOptions["crossOriginEmbedderPolicy"],
    ): Middleware;
    crossOriginOpenerPolicy(
      options?: HelmetOptions["crossOriginOpenerPolicy"],
    ): Middleware;
    crossOriginResourcePolicy(
      options?: HelmetOptions["crossOriginResourcePolicy"],
    ): Middleware;
    dnsPrefetchControl(
      options?: HelmetOptions["dnsPrefetchControl"],
    ): Middleware;
    expectCt(options?: HelmetOptions["expectCt"]): Middleware;
    frameguard(options?: HelmetOptions["frameguard"]): Middleware;
    hidePoweredBy(options?: HelmetOptions["hidePoweredBy"]): Middleware;
    hsts(options?: HelmetOptions["hsts"]): Middleware;
    ieNoOpen(options?: HelmetOptions["ieNoOpen"]): Middleware;
    noSniff(options?: HelmetOptions["noSniff"]): Middleware;
    permittedCrossDomainPolicies(
      options?: HelmetOptions["permittedCrossDomainPolicies"],
    ): Middleware;
    referrerPolicy(options?: HelmetOptions["referrerPolicy"]): Middleware;
    xssFilter(options?: HelmetOptions["xssFilter"]): Middleware;
  }
}

declare const koaHelmet: koaHelmet.KoaHelmet;
export = koaHelmet;
