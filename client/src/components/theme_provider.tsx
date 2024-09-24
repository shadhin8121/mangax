"use client";
import { useEffect, useState, ReactNode } from "react";
import DownNavbar from "./down_navbar";
import { useAtom } from "jotai";
import { changedOrNot } from "@/globalStore/jotai";

interface ThemeProviderProps {
    children: ReactNode; // Change: Added type for children prop
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [result, setResult] = useState<string>(""); // Change: Typed state
    const [changed] = useAtom(changedOrNot); // No change needed

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        switch (theme) {
            case null:
            case "dark":
            case "system_dark":
                setResult("dark");
                break;
            case "light":
            case "system_light":
                setResult("");
                break;
            default:
                setResult("dark");
                break;
        }
    }, [changed]);

    return (
        <div className={result}>
            <div className="dark:bg-slate-800">
                {children}
                <DownNavbar />
            </div>
        </div>
    );
};

export default ThemeProvider;
