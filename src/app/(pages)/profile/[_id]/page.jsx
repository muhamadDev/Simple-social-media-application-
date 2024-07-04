import connectDB from "@/lib/Mongo";
import { users, posts } from "@/lib/Models";
import Image from "next/image";
import Post from "@/components/Post";

export default async function ProfilePagr({ params }) {
    const _id = params._id;
    
    try {
        await connectDB();
        
        const user = await users.findOne({_id});
        const allUsersPost = await posts.find({userId: user.userId})
        
        return (
            <div className="bg-background h-[100vh] pt-10
                w-full flex justify-start items-center gap-5 flex-col"
            >
                <div className="w-full flex justify-center items-center">
                    <Image 
                        className="w-[25%] aspect-square rounded-full"
                        src={user.img}
                        width={350}
                        height={350}
                        alt="profile pic"
                    />
                    
                </div>
                
                <div className="flex flex-col justify-center items-center pt-10">
                    <div className="text-3xl text-center font-bold py-1">
                        {user.name}
                    </div>
                    <div className="text-xl text-center opacity-80">{user.email}</div>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 
                    px-5 gap-x-5 gap-y-8 py-10"
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
            
                            return ( <Post data={data} key={_id} /> )
                        })

                        
                    }
                    
                </div>
                
            </div>
        )
    } catch (err) {
       return (
           <div className="w-full h-[100vh] text-3xl pt-10 font-bold text-center">
               user not found
           </div>
       )
    }
    
   
}