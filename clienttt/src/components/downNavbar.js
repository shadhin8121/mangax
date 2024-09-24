"use client";
import React from "react";
import { IoHome, IoBook } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { RiWifiOffLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DownNavbar = () => {
    let path = usePathname();

    function lol(event) {
        const currentPath = new URL(event.currentTarget.href).pathname;

        console.log(currentPath);
    }
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-200 dark:border-gray-700 shadow-md lg:w-1/3 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:rounded-xl dark:bg-slate-800">
            <div className="flex justify-around items-center h-16 sm:h-12 md:h-16 lg:h-20">
                <Link href="/">
                    {" "}
                    <div className="flex flex-col items-center cursor-pointer">
                        <IoHome
                            size={24}
                            className={
                                path === "/"
                                    ? "text-blue-500"
                                    : "dark:text-gray-300"
                            }
                        />
                        <span className="text-xs sm:text-sm md:text-base dark:text-gray-200">
                            Home
                        </span>
                    </div>
                </Link>
                <Link href="/bookmark" onClick={(e) => lol(e)}>
                    <div className="flex flex-col items-center cursor-pointer">
                        <IoBook
                            size={24}
                            className={
                                path === "/bookmark/list" ||
                                path === "/bookmark/comments" ||
                                path === "/bookmark"
                                    ? "text-blue-500"
                                    : "dark:text-gray-300"
                            }
                        />
                        <span className="text-xs sm:text-sm md:text-base dark:text-gray-200">
                            Books
                        </span>
                    </div>
                </Link>
                <Link href="/offline">
                    <div className="flex flex-col items-center cursor-pointer">
                        <RiWifiOffLine
                            size={24}
                            className={
                                path === "/offline"
                                    ? "text-blue-500"
                                    : "dark:text-gray-300"
                            }
                        />
                        <span className="text-xs sm:text-sm md:text-base dark:text-gray-200">
                            Offline
                        </span>
                    </div>
                </Link>
                <div className="flex flex-col items-center cursor-pointer">
                    <FaFilter
                        size={24}
                        // className={
                        //     path === "/"
                        //         ? "text-blue-500"
                        //         : "dark:text-gray-300"
                        // }
                    />
                    <span className="text-xs sm:text-sm md:text-base dark:text-gray-200">
                        Filter
                    </span>
                </div>
                <Link href="/settings">
                    <div className="flex flex-col items-center cursor-pointer">
                        <IoMdSettings
                            size={24}
                            className={
                                path === "/settings"
                                    ? "text-blue-500"
                                    : "dark:text-gray-300"
                            }
                        />
                        <span className="text-xs sm:text-sm md:text-base dark:text-gray-200">
                            Settings
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DownNavbar;
