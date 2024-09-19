import Chapters from "@/components/chapters";
import Comic_data_without_chapter from "@/components/comic_data";
import React from "react";

const Page = ({ params }) => {
    return (
        <div>
            {/* covers the information about everything without chapters */}
            <Comic_data_without_chapter params={params} />
            {/* for chapters only */}
            <Chapters params={params} />
        </div>
    );
};

export default Page;
