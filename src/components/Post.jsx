"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation';


export default function Post({ data, children }) {
    const router = useRouter();
    
    function handleClick() {
        console.log(data._id)
        router.push(`/posts/${data._id}`)
    }
    
    return (
            <div 
                className="w-full aspect-[3/4] flex justify-start items-center gap-y-5
                flex-col px-2 bg-card rounded-lg border text-card-foreground 
                shadow-sm relative"
            >
                <div className="w-full h-[70%] py-2" onClick={handleClick}>
                    <Image 
                        className="rounded-3xl w-full h-full object-cover px-2 py-2"
                        src={data.imageUrl}
                        alt="post image"
                        width={299.33}
                        height={299.33}
                        size="(max-width: 768px) 150, 299.33px"
                    />
                </div>

                <div className="w-full h-[30%] flex  items-center flex-col" 
                    onClick={handleClick}
                >
                    
                    <h3 className="w-full text-2xl font-bold py-2 
                        multi-line-ellipsis-2 leading-tight px-2"
                        >
                        {data.title}
                    </h3>
                    
                    <p className="opacity-70 w-full px-2 multi-line-ellipsis"
                    >
                        {data.desc}
                    </p>
                    
                </div>
                    <div className="w-full flex justify-center items-center 
                        absolute bottom-[-20px] left-0">
                        {children}

                    </div>
            </div>
    )
}

