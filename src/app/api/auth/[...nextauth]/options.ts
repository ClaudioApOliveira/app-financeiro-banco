import api from "@/services/api";
import { NextAuthOptions, User } from "next-auth";
import "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type LoginResponse = {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      roles: [string];
    };
  };
};

type ApiError = {
  response?: {
    data?: {
      detalhe?: string;
    };
  };
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
          placeholder: "Digite seu e-mail!",
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
          const apiError = error as ApiError;
          if (apiError.response?.data?.detalhe) {
            throw new Error(apiError.response.data.detalhe);
          } else {
            throw new Error("An unknown error occurred");
          }
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
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
} satisfies NextAuthOptions;