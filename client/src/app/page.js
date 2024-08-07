import DownNavbar from "@/components/downNavbar";
import Following from "@/components/Following";
import Navbar from "@/components/upNavbar";

export default function Home() {
    return (
        <div className="dark:bg-slate-900 ">
            <Navbar />

            <div className="overflow-auto custom-scroll">
                <Following />
            </div>

            <div className="mt-32"></div>
            <DownNavbar />
        </div>
    );
}
