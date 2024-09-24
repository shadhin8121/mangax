import BookMarkPageNavbar from "@/components/bookMarkPageNavbar";
import DownNavbar from "@/components/downNavbar";
import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="container mx-auto dark:bg-slate-800 dark:text-gray-200">
            <BookMarkPageNavbar />
            {children}
        </div>
    );
};

export default Layout;
