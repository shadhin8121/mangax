"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiCircleList } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

const BookMarkPageNavbar: React.FC = () => {
    const pathname = usePathname();

    const getLinkClass = (path: string): string =>
        `h-16 flex items-center justify-center ${
            pathname === path
                ? "border-b-2 text-green-500 border-green-500"
                : "border-b-2 border-transparent"
        }`;

    const getSpanClass = (path: string): string =>
        pathname === path ? "text-green-500" : "";

    return (
        <div className="w-full border-b-2 border-gray-300">
            <div className="flex w-full max-w-lg h-16 items-center justify-around gap-4 md:gap-16">
                <Link
                    href="/bookmark/list"
                    className={getLinkClass("/bookmark/list")}
                >
                    <div className="flex items-center justify-center gap-3">
                        <CiCircleList size={24} />
                        <span className={getSpanClass("/bookmark/list")}>
                            Comic List
                        </span>
                        <span className={getSpanClass("/bookmark/list")}>
                            252
                        </span>
                    </div>
                </Link>
                <Link
                    href="/bookmark/comments"
                    className={getLinkClass("/bookmark/comments")}
                >
                    <div className="flex items-center justify-center gap-3">
                        <FaRegComment size={24} />
                        <span className={getSpanClass("/bookmark/comments")}>
                            Comments
                        </span>
                        <span className={getSpanClass("/bookmark/comments")}>
                            252
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default BookMarkPageNavbar;
