import connectDB from "@/lib/Mongo";
import { posts } from "@/lib/Models";
import Post from "@/components/Post";

export default async function Posts() {
    await connectDB();

    const allPosts = await posts.find();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
            px-5 py-8 gap-x-5 gap-y-8"
        >
            {
                allPosts.map(post => {
                    const { _id, title, desc, userId, imageUrl } = post;
                    const data = { title, desc, userId, imageUrl, _id: _id.toString() };
            
                    return ( <Post data={data} key={_id}  /> )
                })
            }
        </div>
    )
    
}