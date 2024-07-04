import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="flex justify-center flex-col sm:flex-row gap-y-16
            bg-background pt-10 w-full min-h-[100vh]"
        >
            
            <div className="flex-1 flex justify-center flex-col px-10 gap-y-10">
                <h1 className="w-full text-3xl text-center font-black py-5 text-5xl
                    sm:text-start"
                >
                    in here you can post see and react to posts
                </h1>
                
                <div className="w-full flex items-center justify-center 
                    sm:justify-start gap-x-10 pl-5"
                >
                    <Button>Get started</Button>
                    <p className="underline hover:opacity-50 transition">see more</p>
                </div>
                
            </div>

            <div className="flex-1 flex justify-center items-center">
                <Image 
                    className="dark:hidden"
                    src="/documents.png"
                    alt="hero section's image"
                    width={400}
                    height={400}
                />
                <Image 
                    className="hidden dark:block"
                    src="/documents-dark.png"
                    alt="hero section's image"
                    width={400}
                    height={400}
                />
            </div>
            
        </div>
    )
}
