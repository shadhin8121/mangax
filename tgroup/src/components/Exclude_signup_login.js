"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

const Exclude_signup_login = () => {
    const path = usePathname();

    // Define routes where you want to hide the navbar
    const hideNavbarRoutes = ["/login", "/register"];
    return <div>{!hideNavbarRoutes.includes(path) && <Navbar />}</div>;
};

export default Exclude_signup_login;
