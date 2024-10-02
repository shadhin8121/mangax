"use client";
import React, { useEffect, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { SiDarkreader } from "react-icons/si";
import { ImEyeBlocked } from "react-icons/im";
import { MdDarkMode } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { FaDiscord } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { CiLogin, CiLogout } from "react-icons/ci";
import Link from "next/link";
import { useAtom } from "jotai";
import { check_login_status } from "@/globalStore/jotai";

const SettingNav: React.FC = () => {
    const [is_login] = useAtom(check_login_status);

    return (
        <div className="min-h-screen bg-blue-100 flex flex-col items-center dark:bg-slate-900">
            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg p-4 dark:bg-slate-800">
                <Link href="/settings/account-settings">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <GrUserSettings size={24} /> Account Settings
                        </h1>
                    </div>
                </Link>
                <Link href="/settings/reader-settings">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <SiDarkreader size={24} /> Reader Settings
                        </h1>
                    </div>
                </Link>
                <Link href="/settings/block-list">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <ImEyeBlocked size={24} /> Block List
                        </h1>
                    </div>
                </Link>
                <Link href="/settings/theme-settings">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <MdDarkMode size={24} /> Theme
                        </h1>
                    </div>
                </Link>
                <Link href="/settings/request-title">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <VscGitPullRequestNewChanges size={24} /> Request a
                            title
                        </h1>
                    </div>
                </Link>
                <Link href="/settings/donate">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <FaDiscord size={24} /> Join Discord
                        </h1>
                    </div>
                </Link>
                <Link href="/settings/donate">
                    <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                        <h1 className="flex items-center gap-2 text-blue-600 dark:text-gray-200">
                            <BiSolidDonateHeart size={24} /> Donate
                        </h1>
                    </div>
                </Link>
                <div>
                    {" "}
                    {/* Change: Used 'undefined' instead of 'null' */}
                    <Link href={is_login ? "/logout" : "/login"}>
                        <div className="w-full border-b-2 border-gray-200 h-12 flex items-center justify-between px-4 transition">
                            {is_login ? (
                                <span className="flex items-center gap-3">
                                    <CiLogout /> Logout
                                </span>
                            ) : (
                                <span className="flex items-center gap-3">
                                    <CiLogin /> Login
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SettingNav;
