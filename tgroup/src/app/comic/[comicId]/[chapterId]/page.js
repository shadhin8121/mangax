"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
    //router
    let router = useRouter();

    function one_step_back() {
        router.back();
    }
    return (
        <div>
            ChapterId is {params.chapterId}
            <button
                onClick={one_step_back}
                className="w-[300px] h-10 bg-gray-300 hover:bg-gray-400 block"
            >
                Go back
            </button>
        </div>
    );
};

export default Page;
