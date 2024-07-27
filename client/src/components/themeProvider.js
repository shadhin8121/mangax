"use client";
import { useEffect, useState } from "react";
import DownNavbar from "./downNavbar";
import { useAtom } from "jotai";
import { changedOrNot } from "@/globalStore/jotai";

const ThemeProvider = ({ children }) => {
    let [result, setResult] = useState("");
    let [changed, setChange] = useAtom(changedOrNot);

    useEffect(() => {
        let theme = localStorage.getItem("theme");
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
