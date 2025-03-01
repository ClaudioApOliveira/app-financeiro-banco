import api from "@/services/api";
import { NextAuthOptions, User } from "next-auth";
import "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginResponse = {
  data:{
    token: string;
    user: {
      id: string;
      email: string;
      roles: [string];
    }
  }
};

export const options = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "E-mail",
          type: "email",
          placeholder: "Digite sey e-mail!",
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "Digite sua senha!",
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const foundUser = await api().post<LoginResponse>(
            "security/login",
            credentials
          );
          if (foundUser) {
            const { token, user } = foundUser.data.data;           
            const userResult = {
              id: user.id,
              email: user.email,
              roles: user.roles,
              token,
            };
            return userResult;
          }
        } catch (error) {
          console.log("Erro ao autorizar um usuario", error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {      
        token.user = user;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthOptions;