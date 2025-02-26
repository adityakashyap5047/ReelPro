import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // In the credentials we give the credentials
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            // In the authorize we write the logic
            async authorize(credentials){

                if(!credentials?.email || !credentials.password){
                    throw new Error("Missing email or password")
                }

                try {
                    await connectDB();
                    const user = await User.findOne({email: credentials.email});

                    if (!user) {
                        throw new Error("No user found")
                    }

                    const isMatched = await bcrypt.compare(credentials.password, user.password)

                    if(!isMatched){
                        throw new Error("Wrong Password!!!, Password didn't match")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                } catch (error) {
                    throw error
                }
            }
        })
    ],

    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session, token}){

            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET
}