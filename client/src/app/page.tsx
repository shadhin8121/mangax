"use client";
import { getProfileData } from "@/api/api";
import DownNavbar from "@/components/down_navbar";
import Following from "@/components/following";
import Navbar from "@/components/up_navbar";
// import { check_login_status, global_profile_data } from "@/globalStore/jotai";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Home(): JSX.Element {
    // Query for profile data
    const { data: profileData, isError } = useQuery({
        queryKey: ["profile_data"],
        queryFn: getProfileData,
        retry: false,
    });

    // Determine if the user is logged in
    const isLoggedIn = !!profileData && !isError;

    return (
        <div className="dark:bg-slate-900">
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-2xl md:text-3xl px-2 pt-3 pb-1">
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
