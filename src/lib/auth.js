import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import connectDB from "@/lib/Mongo"
import { users, posts } from "@/lib/Models";


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({user}) {
            console.log(user);
            const { name, email, image, id } = user;
            
            try {
                await connectDB();
                
                const person = new users({
                    name,
                    email,
                    img: image,
                    userId: id,
                });
                
                await person.save();
                
            } catch (err) {
               console.log("user exist in the db, (user in not new)")
            }
            return true
        }
    }
})
