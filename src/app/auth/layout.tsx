import { currentUser } from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from "react";
import Image from "next/image";
import SignUp from "./sign-up/page";
type Props = {
    children: React.ReactNode;
}

const Layout = async ({children}: Props) => {
    const user = await currentUser(); //return null if user is not logged in

    if(user) redirect("/")
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

            <div className="hiddenlg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-cream flex-col pt-10 pl-24 gap-3">
                
                <h2 className="text-gravel md:text-4xl font-bold">
                    Hi, I&apos;m your AI sales assistant. I&apos;m here to help you with your sales!
                </h2>
                <p className="text-iridium md:text-sm mb-10">
                    SmartSales is capable of capturing your lead information without a form...{''}<br/>
                    something never done before
                </p>

                <Image
                    src="/images/app-ui.png"
                    alt="app image"
                    loading="lazy"
                    sizes="30"
                    className="absolute shrink-0 !w-[1600px] top-48"
                    width={0}
                    height={0}
                />

            </div> 

        </div>
    )
}

export default Layout;