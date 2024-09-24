import BookMarkPageNavbar from "@/components/book_mark_page_navbar";
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container mx-auto dark:bg-slate-800 dark:text-gray-200">
            <BookMarkPageNavbar />
            {children}
        </div>
    );
};

export default Layout;
