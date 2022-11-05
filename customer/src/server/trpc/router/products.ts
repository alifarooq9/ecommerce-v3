import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const productsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        query: z.object({
          color: z.string().array().or(z.string()),
          category: z.string().array().or(z.string()),
          size: z.string().array().or(z.string()),
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
    .query(({ input }) => {
      console.log(input.query);

      return {
        greeting: `Hello ${input ?? "world"}`,
      };
    }),
});
