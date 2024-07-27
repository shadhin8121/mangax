import DownNavbar from "@/components/downNavbar";
import ImageSlider from "@/components/ImageSlider";
import Navbar from "@/components/upNavbar";

export default function Home() {
    return (
        <div className="dark:bg-slate-900">
            <Navbar />
            <div className="min-h-screen">
                {/*other component goes here*/}
                <div className="">
                    <ImageSlider />
                </div>
            </div>
            <DownNavbar />
        </div>
    );
}
