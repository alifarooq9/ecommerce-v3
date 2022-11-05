import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcryptjs";

export const authRouter = router({
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  createAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.name === "")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify([
            {
              code: "invalid_string",
              message: "Invalid Name",
            },
          ]),
        });

      if (input.password === "")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify([
            {
              code: "invalid_string",
              message: "Invalid Password",
            },
          ]),
        });

      if (input.confirmPassword === "")
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify([
            {
              code: "invalid_string",
              message: "Invalid Confirm Password",
            },
          ]),
        });

      if (input.password === input.confirmPassword) {
        try {
          return await ctx.prisma.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: await bcrypt.hash(input.password, 8),
              emailVerified: null,
            },
          });
        } catch (e: any) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: JSON.stringify([
              {
                code: "error",
                message:
                  e.code === "P2002" ? "Email is already in use." : e.message,
              },
            ]),
          });
        }
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify([
            {
              code: "unmatched_password",
              message: "Password and Confirm Password do not match",
            },
          ]),
        });
      }
    }),
});
