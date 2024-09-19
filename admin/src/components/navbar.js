"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const pathName = usePathname();

    const getLinkClass = (path) =>
        pathName === path
            ? "bg-blue-600 text-white px-4 py-2 rounded"
            : "text-white hover:bg-gray-700 px-4 py-2 rounded";

    return (
        <div className="bg-gray-800 p-4">
            <div className="flex justify-center space-x-4">
                <Link href="/home" className={getLinkClass("/home")}>
                    Home
                </Link>
                <Link href="/approve" className={getLinkClass("/approve")}>
                    Approve
                </Link>
                <Link href="/notice" className={getLinkClass("/notice")}>
                    Notice Board
                </Link>
                <Link href="/profile" className={getLinkClass("/profile")}>
                    Profile
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
