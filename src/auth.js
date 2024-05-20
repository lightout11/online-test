import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./libs/prisma";
import { verify } from "argon2";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          select: {
            id: true,
            email: true,
            passwordHash: true,
            firstName: true,
            lastName: true,
          },
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;
        const isPasswordVerified = await verify(
          user.passwordHash,
          credentials.password
        );
        if (!isPasswordVerified) return null;
        else
          return {
            id: user.id,
            email: user.email,
            name: user.firstName + " " + user.lastName,
          };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  trustHost: true,
});
