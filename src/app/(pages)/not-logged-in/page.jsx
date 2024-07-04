import LoginBtn from "@/components/LoginBtn";

export default function NotLoggAedIn() {
    return (
        <div className="w-full bg-background pt-5
            flex justify-center items-center flex-col gap-x-5"
        >
            <div className="w-full text-2xl font-bold text-center py-10 px-2">
                you are not Logged in, please login then try again.
            </div>
            
            <div className="w-full flex justify-center items-center gap-x-5">
                <LoginBtn />
                <p className="underline font-bold">learn more</p>
            </div>
        </div>
    )
}