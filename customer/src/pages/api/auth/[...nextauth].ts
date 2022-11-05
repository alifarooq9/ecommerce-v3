import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  secret: env.NEXTAUTH_SECRET,
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  debug: true,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);

      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user; // Setting token in session

      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user !== null) {
            //Compare the hash
            const res = await bcrypt.compare(
              credentials.password,
              user.password as string
            );

            if (res === true) {
              const userAccount = {
                id: user.id,
                name: user.name,
                email: user.email,
                isHavePassword: user.password ? true : false,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                emailVerified: user.emailVerified,
                role: user.role,
                phoneNumber: user.phoneNumber,
                image: user.image,
              };
              return userAccount;
            } else {
              throw new Error("Invalid credentials.");
            }
          } else {
            throw new Error("Invalid credentials.");
          }
        } catch (err) {
          throw new Error("Invalid credentials.");
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
