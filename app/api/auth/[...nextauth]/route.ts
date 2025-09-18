import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar",
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,


    callbacks: {
        async signIn({ user, account }) {
            try {
                const cookieStore = cookies();
                const userType = (await cookieStore).get("userType")?.value;

                if (userType === "client") {
                    const [firstName, lastName] = user.name?.split(" ") ?? ["-", "-"];
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/clients`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            firstName: firstName || "",
                            lastName: lastName || "",
                            status: "Auto-Added",
                            role: ["client"],
                        }),
                    });
                    const result = await res.json();
                    console.log({ result })
                    if (!res.ok) console.error(result.message);
                    (user as any).id = result.id;
                    (user as any).role = result.role;
                    (user as any).access = "client";
                } else if (userType === "staff") {
                    const [firstName, lastName] = user.name?.split(" ") ?? ["-", "-"];
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/Staff`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            firstName: firstName || "",
                            lastName: lastName || "",
                            status: "Auto-Added",
                            role: ["staff"],
                        }),
                    });
                    const result = await res.json();
                    console.log({ result })
                    if (!res.ok) console.error(result.message);
                    (user as any).id = result.id;
                    (user as any).role = result.role;
                    (user as any).access = "staff";
                }
                return true;
            } catch (error) {
                console.error("Sign-in error:", error);
                return false;
            }
        },
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.userId = user.id;
                token.role = user.role as string;
                token.access = user.access as string;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.userId = token.userId as string;
            session.role = token.role;
            session.access = token.access;
            return session;
        },
        async redirect({ url, baseUrl }) {
            const cookieStore = cookies();
            const userType = (await cookieStore).get("userType")?.value;
            if (userType === "client") return `${baseUrl}/client`;
            if (userType === "staff") return `${baseUrl}/back_office`;
            return baseUrl; // default fallback
        },
    }
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
