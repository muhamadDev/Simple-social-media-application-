import Image from "next/image"
import Link from "next/link"
import ModeToggle from "@/components/ModeToggle";
import LoginBtn from "@/components/LoginBtn";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export default async function Navbar() {
    
    const sesstion = await auth();
    const display = sesstion?.user ? "block" : "hidden";
    const justify = sesstion?.user ? "justify-end" : "justify-between" 
    
    return (
        <div className="w-full h-[65px] bg-background px-5
            flex justify-between items-center"
        >
            <div className="w-[180px] flex justify-start items-center gap-x-1">
                <Image 
                    className="dark:hidden w-[35px] h-auto"
                    src="/logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                />
                <Image 
                    className="hidden dark:block w-[35px] h-auto"
                    src="/logo-dark.svg"
                    alt="logo"
                    width={40}
                    height={40}
                />
                <p className="font-bold">Dark</p>
            </div>

            <div className="flex justify-center items-center gap-x-5 flex-1 font-bold">
                
                <Link href="/" className="hover:underline hover:text-blue-600 
                    text-sm sm:text-md md:text-2xl lg:text-2xl"
                >
                    Home
                </Link>
                
                <Link href="/posts"
                    className="hover:underline hover:text-blue-600 
                    text-sm sm:text-md md:text-2xl lg:text-2xl"
                >
                    Posts
                </Link>
                
                <Link href="/create"
                    className="hover:underline hover:text-blue-600 
                    text-sm sm:text-md md:text-2xl lg:text-2xl"
                >
                    Create
                </Link>
                
                <Link href="/profile" className={
                    cn("hover:underline hover:text-blue-600 text-sm sm:text-md md:text-2xl lg:text-2xl ", display) }
                >
                    Profile
                </Link>
                
            </div>

            <div className={cn("w-[180px] flex items-center", justify)}>
                <LoginBtn />
                <ModeToggle />
            </div>
        </div>
    )
}