import { currentUser } from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from "react";
import Image from "next/image";

type Props = {
    children: React.ReactNode;
}

const Layout = async ({children}: Props) => {
    const user = await currentUser(); //return null if user is not logged in

    if(user) redirect("/");
    // if user is not logged in, redirect to the root route
    return (
        <div className="h-screen flex w-full justify-center">
            <div className="w-[600px] ld:w-full flex flex-col items-start p-6">
                <Image
                    src="/images/logo.png"
                    alt="LOGO"
                    sizes="100vw"
                    style={{
                    width: '20%',
                    height: 'auto',
                    }}
                    width={0}
                    height={0}
                />
                {children}
            </div> 
        </div>
    )
}

export default Layout;