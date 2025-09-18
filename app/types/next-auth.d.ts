import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        userId?: string;
        role?: string;
        access?: string;
    }

    interface User extends DefaultUser {
        role?: string;
        userId?: string;
        access: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        userId?: string;
        role?: string;
        access: string
    }
}