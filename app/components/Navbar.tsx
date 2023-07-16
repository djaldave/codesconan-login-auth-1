import Link from "next/link";
import {UserAuth} from "@/app/context/AuthContext";
import {useEffect, useState} from "react";

export default function Navbar() {
	// @ts-ignore
	const {user, signInWithGoogle, signOutWithGoogle} = UserAuth();
	const [loading, setLoading] = useState(true);

	const handleSignIn = () => {
	// 	loading while waiting for authentication
		setLoading(true);
		signInWithGoogle();

	}

	const handleSignOut = async () => {
		signOutWithGoogle();
	}

	useEffect(() => {
		const checkAuthentication = async () => {
			await new Promise((resolve) => setTimeout(resolve, 50));
			setLoading(false);
		}

		checkAuthentication().then(r => r);
	} ,[user]);

	return (
		<div className={"h-20 w-full border-b-2 flex items-center justify-between p-2"}>
			<ul className={"flex"}>
				<li className={"p-2 cursor-pointer"}>
					<Link href={"/"}>Home</Link>
				</li>
				<li className={"p-2 cursor-pointer"}>
					<Link href={"/about"}>About</Link>
				</li>
				<li className={"p-2 cursor-pointer"}>
					<Link href={"/profile"}>Profile</Link>
				</li>
			</ul>

			{
				loading?
				// line progress bar
				null
					:
				user ? null : (
					<p className={"p-2"}>Not logged in</p>
				)
			}

			{
				loading?
					// circular progress bar
					<div className={"flex items-center"}>
						<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
					</div>
					:
				user ? (
					<button onClick={handleSignOut} className={"p-2 bg-blue-500 text-white rounded-md"}>
						Sign Out
					</button>
				) : (
					<button onClick={handleSignIn} className={"p-2 bg-blue-500 text-white rounded-md"}>
						Sign In
					</button>
				)
			}
		</div>
	)
}