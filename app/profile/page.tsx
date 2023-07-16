"use client";
import { UserAuth} from "@/app/context/AuthContext";
import {useEffect, useState} from "react";
import Loading from "@/app/components/Loading";

export default  function ProfilePage() {
    // @ts-ignore
    const {user} = UserAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
               await new Promise((resolve) => setTimeout(resolve, 50));
               setLoading(false);
        }
        checkAuthentication().then(r => r);
    }, [user]);

    return (
        <>
            <div className="p-4">
                { loading ? (
                //   center circular progress bar
                   <Loading />

                ) :
                    user ?
                        <div className={"flex flex-col items-center"}>
                            {/*welcome message and show some basic details*/}
                            <h1 className={"text-2xl"}>Welcome {user.displayName}</h1>
                            <img src={user.photoURL} alt={user.displayName} className={"w-10 h-10 rounded-full mt-2"} />
                        </div>
                        :
                        null
                }

            </div>
        </>
    );
}
