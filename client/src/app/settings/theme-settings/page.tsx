"use client"; // Indicates that this is a Client Component in Next.js

import { changedOrNot } from "@/globalStore/jotai";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Page: React.FC = () => {
    // State to manage which radio button is checked
    const [checkedIndex, setCheckedIndex] = useState<number>(0);

    // State to manage the current theme
    const [localTheme, setLocalTheme] = useState<string>(() => {
        // Initialize theme from localStorage, defaulting to "system" if not set
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "system";
        }
        return "system";
    });

    // Global state atom from jotai to notify other components of theme changes
    const [, setChange] = useAtom(changedOrNot);

    // Handler for radio button clicks
    const handleButtonClick = (index: number) => {
        setCheckedIndex(index);
    };

    // Theme setter functions
    const onClickOne = () => {
        setLocalTheme("dark");
    };

    const onClickTwo = () => {
        setLocalTheme("light");
    };

    const onClickThree = () => {
        setLocalTheme("system");
    };

    // Effect to apply theme changes and handle system preference changes
    useEffect(() => {
        // Function to apply the current theme
        const applyTheme = (theme: string) => {
            if (theme === "system") {
                // Check system preference
                const systemDark = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;
                document.documentElement.classList.toggle("dark", systemDark);
            } else {
                // Apply dark mode based on theme setting
                document.documentElement.classList.toggle(
                    "dark",
                    theme === "dark"
                );
            }
        };

        // Save theme to localStorage and update global state
        localStorage.setItem("theme", localTheme);
        setChange(localTheme);
        applyTheme(localTheme);

        // Set up listener for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (localTheme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        // Cleanup function to remove event listener
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [localTheme, setChange]);

    // Effect to initialize theme from localStorage on component mount
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "system";
        setLocalTheme(storedTheme);
        // Set the correct radio button based on the stored theme
        setCheckedIndex(
            storedTheme === "dark" ? 0 : storedTheme === "light" ? 1 : 2
        );
    }, []);

    return (
        <div className="dark:bg-slate-900">
            <div className="container mx-auto">
                <div>
                    <h1 className="text-4xl py-2 dark:text-gray-200">
                        Theme Settings
                    </h1>
                    <hr />
                    <div className="w-full max-w-sm mx-auto min-h-screen pt-2">
                        <div className="p-4 bg-gray-100 rounded-lg space-y-4 dark:bg-slate-800 dark:text-gray-200">
                            {/* Dark mode option */}
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
                            {/* Light mode option */}
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
                            {/* System sync option */}
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
