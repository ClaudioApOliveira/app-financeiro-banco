// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      email: string;
      roles: [string];
    };
  }
  interface User {
    id: string;
    token: string;
    email: string;
    roles: [string];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      token: string;
      email: string;
      roles: [string];
    };
  }
}