"use client";
import Image from "next/image"
import { useRouter } from "next/navigation";

export default function UserProfile( {user} ) {
    const router = useRouter();
    
    function GoToProfile() {
        router.push("/profile/" + user._id);
    }
    
    return (
        <div className="flex justify-center gap-x-3 w-full pt-10" 
            onClick={GoToProfile}
        >
            
            <Image 
                className="w-[60px] h-[60px] object-cover rounded-full"
                src={user.img}
                width={60}
                height={60}
                alt="user logo"
            />
            
            <div>
                <div className="text-md font-bold text-left">{user.name}</div>
                <div className="opacity-70">{user.email}</div>
            </div>
            
        </div>
    )
}