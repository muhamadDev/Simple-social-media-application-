import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, signOut, auth } from "@/lib/auth";

export default async function LoginBtn({isNavbar}) {
    const session = await auth();
    async function handleLogin() {
        "use server";
        
        await signIn("github");
    }

    // async function handleLogout() {
    //     "use server";
    //     await signOut()
    // }

    if(session?.user) { 
        return ""
    }
    
    return (
        <form action={handleLogin}>
            <Button className="hidden sm:block">Login</Button>
        </form> 
    )
}