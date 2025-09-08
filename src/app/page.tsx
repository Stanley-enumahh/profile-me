import { TopNav } from "@/components/topNav";
import { Zap } from "lucide-react";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/background-lines";

const Home = () => {
  return (
    <div className="flex w-full h-fit justify-center">
      <TopNav />
      <div className="w-[87%] md:w-[80%] h-fit flex flex-col gap-10 items-center ">
        {/* hero section */}
        <BackgroundLines className="w-full flex h-[450px] flex-col gap-5 md:mt-[120px] mt-[100px] items-center">
          <span className="text-[#ebebeb] bg-[#ebebeb]/20 backdrop-blur-xl border border-[#099137] px-4 flex flex-row gap-2 items-center py-2 rounded-xl text-sm">
            Fast & Easy to use
            <Zap size={14} className="text-red-400" />
          </span>
          <h1 className="font-bold text-2xl text-white md:text-5xl text-center leading-[36px] md:leading-[55px] z-20">
            Build and Launch your profile online <br /> in minutes no design or
            coding skills needed
          </h1>
          <p className="text-neutral-200 text-sm w-[90%] md:w-[60%] text-center">
            Build and publish a beautiful profile page without writing a single
            line of code. Perfect for showcasing yourself, your socials, or your
            business - fast, simple, and ready to share.
          </p>

          <span className="flex flex-row gap-3 md:text-sm text-xs items-center mt-7 md:mt-4">
            <Link
              href="/CreateProfile"
              className="bg-[#017BF6] text-white px-3 md:px-7 py-3 rounded-sm cursor-pointer hover:bg-[#05505a] z-40 transition-all duration-200 shadow-lg"
            >
              Create your profile
            </Link>

            <Link
              href="/CreateProfile"
              className=" text-white px-3 md:px-7 py-3 z-40 rounded-sm cursor-pointer bg-[#099137] transition-all duration-200 shadow-lg"
            >
              Explore templates
            </Link>
          </span>
        </BackgroundLines>

        <section id="section1" className="">
          <h1 className="text-white">Features</h1>
        </section>
      </div>
    </div>
  );
};

export default Home;
