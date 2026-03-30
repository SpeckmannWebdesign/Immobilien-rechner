import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    // E-Mail Magic Link via Resend
    Resend({
      from: process.env.EMAIL_FROM || "noreply@immobilien-rechner.net",
    }),
    // Google OAuth
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/anmelden",
    verifyRequest: "/anmelden/verifizierung",
    error: "/anmelden/fehler",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
