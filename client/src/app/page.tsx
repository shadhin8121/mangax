"use client";
import DownNavbar from "@/components/down_navbar";
import Following from "@/components/following";
import Navbar from "@/components/up_navbar";
import { useEffect } from "react";

export default function Home(): JSX.Element {
    useEffect(() => {
        profile_data();
    }, []);
    async function profile_data() {
        try {
            let url = process.env.NEXT_PUBLIC_SERVER_URL;
            console.log(url);
            let response = await fetch(`${url}/profile_data`, {
                method: "POST",
                credentials: "include",
            });
            let data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="dark:bg-slate-900 ">
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-2xl md:text-3xl px-2 pt-3 pb-1 ">
                    Following
                </h1>

                <div className="overflow-auto custom-scroll w-[1000px]">
                    <Following />
                </div>
            </div>

            <div className="mt-32"></div>
            <DownNavbar />
        </div>
    );
}
