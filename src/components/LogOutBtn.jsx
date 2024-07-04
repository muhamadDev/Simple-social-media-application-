import { auth, signIn, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function LogOutBtn() {
	const sesstion = await auth(); 

	const handleLogout = async () => {
		"use server";
		await signOut();
	} 

	return (
		<form action={handleLogout}>
			<Button variant="destructive">
				LogOut
			</Button>
		</form>
	)
	
}