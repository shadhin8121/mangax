// "use client";
import React from "react";

const NotFound = () => {
    return <div>The page you are requesting for not found</div>;
};

export default NotFound;

//meta data
export async function generateMetadata() {
    return {
        title: "not found",
        description: "not found description",
    };
}
