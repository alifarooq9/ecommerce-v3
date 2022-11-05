import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const productsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        query: z.object({
          color: z.string().array().or(z.string()).nullish(),
          category: z.string().array().or(z.string()).nullish(),
          size: z.string().array().or(z.string()).nullish(),
        }),
        sort: z.enum([
          "MOSTPOPULAR",
          "BESTRATING",
          "NEWEST",
          "LOWTOHIGH",
          "HIGHTOLOW",
        ]),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log(input.query.color ? input.query.color : null);

      return {};
    }),
});
