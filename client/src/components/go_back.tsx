import React from "react";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const GoBack: React.FC = () => {
    return (
        <div>
            <Link href="/settings">
                <div className="flex items-center h-10 border-b-2 border-gray-200">
                    <h1 className="dark:text-gray-100"> Go Back</h1>{" "}
                    <IoIosArrowRoundBack
                        size={24}
                        className="dark:text-gray-100"
                    />
                </div>
            </Link>
        </div>
    );
};

export default GoBack;
