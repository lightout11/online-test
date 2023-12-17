import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Tên người dùng", type: "text" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.BACKEND_URL + "/users/user", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          return null
        }

        const user = await res.json();

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
