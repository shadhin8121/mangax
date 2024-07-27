"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/bookmark/list") {
            router.push("/bookmark/list");
        }
    }, [pathname, router]);

    return <div className="min-h-screen dark:bg-slate-800"></div>;
};

export default Page;
