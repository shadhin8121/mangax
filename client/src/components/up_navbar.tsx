"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import UpNavbarProfile from "./up_navbar_profile";
import { useAtom } from "jotai";
import { check_login_status, global_profile_data } from "@/globalStore/jotai";


const Navbar: React.FC = () => {
    const [paths, setPaths] = useState<string>("/login");
    const [is_login] = useAtom(check_login_status);


    // Update paths when is_login changes
    useEffect(() => {
        setPaths(is_login ? "/profile" : "/login");
    }, [is_login]); // Depend on is_login

    return (
        <div className="border-b-4 border-gray-300 dark:border-gray-700 shadow-md dark:bg-slate-800">
            <div className="flex flex-wrap items-center justify-between w-[100%] mx-auto py-1 sm:px-6">
                <div className="w-20 sm:w-24 cursor-pointer flex items-center">
                    <Image
                        src="/images/clogo11.png"
                        width={500}
                        height={500}
                        alt="logo"
                    />
                    <span className="dark:text-gray-200">Mangax</span>
                </div>
                <div className="md:flex lg:flex md:items-center lg:items-center hidden ">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-40 sm:w-64 px-2 sm:px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-gray-200 dark:border-gray-600"
                    />
                    <button className="px-2 sm:px-4 py-3 sm:py-3 outline-none border-gray-300 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 focus:outline-none">
                        <IoSearch />
                    </button>
                </div>
                <Link href={paths}>
                    <div className="flex justify-center items-center rounded-full overflow-hidden cursor-pointer ml-4 pr-1">
                        <UpNavbarProfile />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
