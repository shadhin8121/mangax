"use client";
import { changedOrNot } from "@/globalStore/jotai";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [checkedIndex, setCheckedIndex] = useState(0);
    const [localTheme, setLocalTheme] = useState(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            return storedTheme || "dark";
        }
    });
    const [changed, setChange] = useAtom(changedOrNot);

    const handleButtonClick = (index) => {
        setCheckedIndex(index);
    };

    function onClickOne() {
        setLocalTheme("dark");
    }

    function onClickTwo() {
        setLocalTheme("light");
    }

    function onClickThree() {
        let darkOrNot = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setLocalTheme(darkOrNot ? "system_dark" : "system_light");
    }

    useEffect(() => {
        localStorage.setItem("theme", localTheme);
        setChange(localTheme);
    }, [localTheme, setChange]);

    useEffect(() => {
        if (localTheme.startsWith("system")) {
            let darkOrNot = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            setLocalTheme(darkOrNot ? "system_dark" : "system_light");

            const mediaQuery = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            const handleChange = (e) => {
                setLocalTheme(e.matches ? "system_dark" : "system_light");
            };
            mediaQuery.addEventListener("change", handleChange);

            return () => {
                mediaQuery.removeEventListener("change", handleChange);
            };
        }
    }, [localTheme]);

    useEffect(() => {
        let getItemFromLocal = localStorage.getItem("theme");
        if (getItemFromLocal === "dark") {
            setCheckedIndex(0);
        } else if (getItemFromLocal === "light") {
            setCheckedIndex(1);
        } else if (
            getItemFromLocal === "system_dark" ||
            getItemFromLocal === "system_light"
        ) {
            setCheckedIndex(2);
        } else {
            setCheckedIndex(0);
        }
    }, []);

    return (
        <div className="dark:bg-slate-900">
            <div className="container mx-auto ">
                <div>
                    <h1 className="text-4xl py-2 dark:text-gray-200">
                        Theme Settings
                    </h1>
                    <hr />
                    <div className="w-full max-w-sm mx-auto min-h-screen pt-2">
                        <div className="p-4 bg-gray-100 rounded-lg space-y-4 dark:bg-slate-800 dark:text-gray-200">
                            <div
                                onClick={onClickOne}
                                className="flex items-center space-x-2 pb-3 border-b-2"
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    checked={checkedIndex === 0}
                                    onChange={() => handleButtonClick(0)}
                                />
                                <button
                                    onClick={() => handleButtonClick(0)}
                                    className="w-full text-left"
                                >
                                    Dark
                                </button>
                            </div>
                            <div
                                className="flex items-center space-x-2 pb-3 border-b-2"
                                onClick={onClickTwo}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    checked={checkedIndex === 1}
                                    onChange={() => handleButtonClick(1)}
                                />
                                <button
                                    onClick={() => handleButtonClick(1)}
                                    className="w-full text-left"
                                >
                                    Light
                                </button>
                            </div>
                            <div
                                className="flex items-center space-x-2 pb-3 border-b-2"
                                onClick={onClickThree}
                            >
                                <input
                                    type="radio"
                                    name="theme"
                                    checked={checkedIndex === 2}
                                    onChange={() => handleButtonClick(2)}
                                />
                                <button
                                    onClick={() => handleButtonClick(2)}
                                    className="w-full text-left"
                                >
                                    Sync With System
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
