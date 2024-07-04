import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import connectDB from "@/lib/Mongo";
import { posts, users } from "@/lib/Models";
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation'
import { storage } from "@/lib/Firebase"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";


export default async function Create() {
    const sesstion = await auth();
    
    if(!sesstion?.user) {
        redirect("/not-logged-in")
    }
    
    async function handleCreate(formData) {
        "use server"

        const title = formData.get("title");
        const desc = formData.get("desc");
        
        const image = formData.get("image");
        const storageRef = ref(storage, `${sesstion.user.email}/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        
        const downloadUrl = await getDownloadURL(
            ref(storage,storageRef._location.path_)
        )

        
        try {
            await connectDB();
            const email = sesstion.user.email;
            const User = await users.findOne({email});

            const newPost = new posts({
                title,
                desc,
                userId: User.userId,
                imageUrl: downloadUrl
            }) 

            await newPost.save();
            redirect("/posts")
            
        } catch (err) {
            console.log("error in creating post: ", err?.message);
        }
        
    }
    
    return (
        
        <div className="bg-background h-screen w-full flex justify-center items-center">
            
            <form 
                action={handleCreate}
                className="flex flex-col justify-center items-center 
                px-10 py-5 shadow-md gap-y-5" 
            >
                <Image 
                    src="/reading.png"
                    alt="login image"
                    width={400}
                    height={400}
                    className="dark:hidden py-4 w-[250px]"
                />
                <Image 
                    src="/reading-dark.png"
                    alt="login image"
                    width={400}
                    height={400}
                    className="hidden dark:block py-4 w-[250px]"
                />
                
                <Input type="tetx" placeholder="tile"  name="title"/>
                <Input type="tetx" placeholder="desc"  name="desc"/>
                <Input type="file" placeholder="image" name="image" />
                <Button>create</Button>
            </form>
        </div>
    )
}
