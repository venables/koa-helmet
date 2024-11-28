// Type definitions for koa-helmet 8.0
// Project: https://github.com/venables/koa-helmet#readme
// Definitions by: Nick Simmons <https://github.com/nsimmons>
//                 Jan Dolezel <https://github.com/dolezel>
//                 Julien Wajsberg <https://github.com/julienw>
// TypeScript Version: 2.3

import type { default as helmet, HelmetOptions } from "helmet";
import { Middleware } from "koa";

type Helmet = typeof helmet;

type KoaHelmet = {
  [HelmetMiddleware in keyof Helmet]: (
    ...options: Parameters<Helmet[HelmetMiddleware]>
  ) => Middleware;
} & ((options?: HelmetOptions) => Middleware);

declare const koaHelmet: KoaHelmet;
export default koaHelmet;
