import React from "react";

const Page = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <p className="text-xl font-semibold mb-2">
                    User name: <span className="text-blue-500">user123</span>
                </p>
                <p className="text-lg mb-2">
                    User ID: <span className="text-gray-700">35262342342</span>
                </p>
                <p className="text-lg mb-2">
                    Translation Group:{" "}
                    <span className="text-gray-700">Scanalator</span>
                </p>
                <p className="text-lg">
                    Total Comics: <span className="text-green-500">12</span>
                </p>
            </div>
            <div className="flex justify-center mt-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Page;
