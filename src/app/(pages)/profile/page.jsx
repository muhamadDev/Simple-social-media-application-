import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from 'next/navigation';
import Post from "@/components/Post"
import connectDB from "@/lib/Mongo";
import { users, posts } from "@/lib/Models";
import DeletePostBtn from "@/components/DeletePostBtn";

export default async function profile() {
    const sesstion = await auth();
    
    if(!sesstion?.user) {
        redirect("/not-logged-in");
    }
    
    await connectDB();
    const user = await users.findOne({email: sesstion.user.email});
    const allUsersPost = await posts.find({userId: user.userId});
    

    
    return (
        <div className="bg-background h-[100vh] pt-10
            w-full flex justify-start items-center gap-5 flex-col"
        >
            <div className="w-full flex justify-center items-center">
                <Image 
                    className="w-[25%] aspect-square rounded-full"
                    src={sesstion.user.image}
                    width={350}
                    height={350}
                    alt="profile pic"
                />
                
            </div>
            
            <div className="flex flex-col justify-center items-center pt-10">
                <div className="text-3xl md:text-4xl 
                    lg:text-6xl text-center font-bold py-1"
                >
                    {sesstion.user.name}
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl text-center opacity-80">
                    {sesstion.user.email}
                </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                px-5 py-8 gap-x-5 gap-y-8"
            >

                {

                    allUsersPost.map(post => {
                        const { _id, title, desc, userId, imageUrl } = post;
                        
                        const data = {
                            title, 
                            desc, 
                            userId,
                            imageUrl, 
                            _id: _id.toString() 
                        };
        
                        return (
                            <Post data={data} key={data._id} delete={true}> 
                                <DeletePostBtn postId={post._id} /> 
                            </Post>
                        );
                    })

                    
                }
                
            </div>
            
        </div>
    )
}