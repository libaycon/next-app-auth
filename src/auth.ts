import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { authConfig } from "./app/auth/auth.config"
import z from "zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/utils/db"

const parsedCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
 
export const { 
    handlers: {GET, POST},
    auth, 
    signIn, 
    signOut 
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig
})  
/* ...authConfig,
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const schemaParsed = parsedCredentials.safeParse(credentials);
        if(schemaParsed.success) {
          //TODO GET USER FROM DATABASE
          const user = await fetch('/');
          if(!user) return null
        }
        return null
      }
    })
  ], */