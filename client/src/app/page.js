import DownNavbar from "@/components/downNavbar";
import Following from "@/components/Following";
import Navbar from "@/components/upNavbar";

export default function Home() {
    return (
        <div className="dark:bg-slate-900 ">
            <Navbar />
            <div className="container mx-auto">
                <h1 className="text-2xl md:text-3xl px-2 pt-3 pb-1 ">
                    Following
                </h1>

                <div className="overflow-auto custom-scroll">
                    <Following />
                </div>
            </div>

            <div className="mt-32"></div>
            <DownNavbar />
        </div>
    );
}
