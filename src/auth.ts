import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { verify } from "argon2";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, request) {
        console.log("auth");
        const user = await prisma.user.findFirst({
          select: {
            id: true,
            email: true,
            passwordHash: true,
            firstName: true,
            lastName: true,
          },
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) return null;
        const isPasswordVerified = await verify(
          user.passwordHash,
          credentials.password as string,
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
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
