import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/Mongo";
import { posts, likes } from "@/lib/Models";
import { storage, getFilePathFromUrl } from "@/lib/Firebase"
import { ref, deleteObject } from "firebase/storage";

export default async function DeletePostBtn({ postId }) {
    const sesstion = await auth();
    
    if (!sesstion?.user) {
        redirect("/not-logged-in");
    }
    
    async function deletePost() {
        "use server";
        
        await connectDB();

        const post = await posts.findOne({ _id: postId })
        const allLikes = await likes.deleteMany({ postId: postId });
        
        const filePath = getFilePathFromUrl(post.imageUrl);
        
        const fileRef = ref(storage, filePath);

        await deleteObject(fileRef)

        await posts.deleteOne({ _id: postId });
    
        console.log("deleted")
    }

    return (
        <div>
            <form action={deletePost}>
                <Button>delete</Button>
            </form>
        </div>
    )
}