import Image from "next/image";
import React from "react";

const Page = () => {
    return (
        <div className="container mx-auto pb-56 min-h-screen">
            <h1 className="lg:text-4xl pb-3 md:text-3xl pt-2 capitalize dark:text-gray-200 text-2xl">
                your offline reading list
            </h1>
            <hr />

            <div className=" grid lg:grid-cols-4 gap-7">
                <div className="mt-3">
                    <div className="w-full md:w-auto lg:w-96 border h-auto flex">
                        <Image
                            src="/images/lol.jpg"
                            width={100}
                            height={100}
                            alt="manga cover"
                        />
                        <div className="pl-4 ">
                            <h1 className="dark:text-gray-100">
                                Solo Leveling
                            </h1>
                            <span className="flex dark:text-gray-200">
                                Chapter: <p>205</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
