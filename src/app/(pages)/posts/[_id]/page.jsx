import connectDB from "@/lib/Mongo";
import { posts, users, likes } from "@/lib/Models";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import { redirect } from 'next/navigation';
import {cn} from "@/lib/utils";
import { auth } from "@/lib/auth";
import UserProfile from "@/components/UserProfile";

export default async function PostPage({params}) {
    const _id = params._id;

    try {
        
        await connectDB();
        const post = await posts.findOne({_id: _id});
        const user = await users.findOne({userId: post.userId});
        user._id = user._id.toString();
        
        const allLikes = await likes.find({postId: _id});
        const liked = await likes.exists({postId: _id, ownerId: user.userId});
        
        const IsLiked = liked ? true : false;
        const color  = IsLiked ? "border-indigo-500/100" : "border-transparent";

        const formater = Intl.NumberFormat("en", {
           notation: "compact"
        });
        
        async function handleLike() {
            "use server";
            const sesstion = await auth();
            
            if(!sesstion?.user) {
                redirect("/not-logged-in")
            }
            
            if(IsLiked) {
                await likes.deleteOne({postId: _id, ownerId: user.userId});
                redirect("/posts/" + _id);
                return " "
            }
            
            const like = await new likes({
                postId: _id,
                ownerId: user.userId
            });
            
            await like.save();
            redirect("/posts/" + _id)
        }

        async function visiteProfile() {
            "use server";
            redirect("/profile/" + user._id);
        }
        
        return (
            <div  className="w-full h-[100vh] px-10 flex justify-between 
            flex-col md:flex-row"
            >
                <div className="flex-1">
                    
                    <Image 
                        className="w-full h-[80%] object-cover rounded-2xl"
                        src={post.imageUrl}
                        width={500}
                        height={700}
                        alt="post photo"
                    />
                    
                </div>
                
                <div className="flex-1 flex flex-col justify-start pt-10 px-5 gap-y-5">
                    
                    <div className="w-full text-center text-3xl font-black">
                        {post.title}
                    </div>
                    
                    <div className="opacity-70 px-5 py-3">{post.desc}</div>
                    
                    <form action={handleLike} 
                        className="flex justify-center items-center gap-x-4 w-full"
                    >
                        <Button 
                            variant="secondary"
                            className={cn("border-2", color)}
                        >
                            Like
                        </Button>
                        
                        <div> {formater.format(allLikes.length)} </div>
                    </form>

                    <UserProfile user={user} />

                    
                </div>
                
            </div>
        )
        
    } catch (err) {
        console.log("error in fetching post: ", err?.message)
        return (
            <div className="w-full h-[100vh] text-3xl">
                there was an error please try again later
            </div>
        )
    }
    
    

    
    
}
