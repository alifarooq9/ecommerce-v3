import { emailRouter } from './email';
// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { productsRouter } from "./products";
import { authRouter } from "./auth";

export const appRouter = router({
  products: productsRouter,
  auth: authRouter,
  email: emailRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
