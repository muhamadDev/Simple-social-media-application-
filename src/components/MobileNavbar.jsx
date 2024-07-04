"use client"
import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle"

import { cn } from "@/lib/utils"
import {usePathname} from "next/navigation";

const NavbarItems = [
    {
        name:"Home",
        path: "/"
    },
    {
        name:"Posts",
        path: "/posts"
    },
    {
        name:"Create",
        path: "/create"
    },
    {
        name:"Profile",
        path: "/profile"
    }
]

export default function MobileNavbar({children}) {
    const pathname = usePathname();
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="w-full h-[65px] flex justify-between items-center 
                    px-5 md:hidden"
                > 
                    <div className={`w-[180px] h-[100%] flex justify-start 
                        items-center gap-x-1`}
                    >
                        <Image 
                            className="dark:hidden w-[35px] h-[100%]"
                            src="/logo.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                        <Image 
                            className="hidden dark:block w-[35px] h-[100%]"
                            src="/logo-dark.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                        <p className="font-bold text-xl">Dark</p>
                    </div>

                    <Button variant="outline"
                        className="flex md:hidden px-2"
                    >
                        <AlignJustify />
                    </Button>
                    
                </div>
            </SheetTrigger>
            
            <SheetContent className="flex md:hidden w-[250px]">
                
                <div className="w-full h-full flex flex-col justify-between py-5">
                    
                    <div className="w-full h-[50%] flex flex-col 
                        justify-center items-center gap-5"
                    >
                        {
                            NavbarItems.map(item => {
                                const active = pathname == item.path 
                                    ? "opacity-100 font-black"
                                    : "opacity-80 hover:opacity-50"
                                return (
                                    <Link 
                                        href={item.path}
                                        key={item.name}
                                        className={cn("font-bold text-md", active)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                                
                            })
                        }
                    </div>

                    <div className="w-full flex flex-col justify-center items-center 
                        gap-5 py-5"
                    > 
                        <ModeToggle />
                        { children }
                    </div>
                    
                </div>
                
            </SheetContent>
        </Sheet>
    )
}
