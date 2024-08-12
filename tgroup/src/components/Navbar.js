"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    let path = usePathname();
    let activeClass = "text-white bg-green-500 px-4 py-2 rounded";

    return (
        <div className="bg-gray-800 shadow-md">
            <ul className="container mx-auto flex flex-wrap gap-4 items-center justify-center h-32">
                <li className={path === "/" ? activeClass : "text-gray-300"}>
                    <Link
                        href="/"
                        className="text-xs md:text-base hover:text-white px-4 py-2"
                    >
                        List
                    </Link>
                </li>
                <li
                    className={
                        path === "/create" ? activeClass : "text-gray-300"
                    }
                >
                    <Link
                        href="/create"
                        className="text-xs md:text-base hover:text-white px-4 py-2"
                    >
                        Create new
                    </Link>
                </li>
                <li
                    className={
                        path === "/profile" ? activeClass : "text-gray-300"
                    }
                >
                    <Link
                        href="/profile"
                        className="text-xs md:text-base hover:text-white px-4 py-2"
                    >
                        Profile
                    </Link>
                </li>
                <li
                    className={
                        path === "/notice" ? activeClass : "text-gray-300"
                    }
                >
                    <Link
                        href="/notice"
                        className="text-xs md:text-base hover:text-white px-4 py-2"
                    >
                        Notice
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
