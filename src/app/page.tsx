import { Testimonial } from "@/components/testimonials";
import { LoaderFive } from "@/components/ui/loader";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex  w-full h-fit justify-center">
      <div className="w-[87%] md:w-[80%] h-fit flex flex-col gap-5 items-center">
        {/* hero section */}
        <div className="w-full flex h-[450px] flex-col gap-5 mt-[70px] md:mt-[120px] items-center">
          <h1 className="font-bold text-2xl md:text-5xl text-center leading-[30px] md:leading-[48px]">
            Launch your profile online in minutes <br /> no design or coding
            skills needed
          </h1>
          <p className="text-black/80 text-sm w-[90%] md:w-[60%] text-center">
            Build and publish a beautiful profile page without writing a single
            line of code. Perfect for showcasing yourself, your work, or your
            business - fast, simple, and ready to share.
          </p>

          <span className="flex flex-row gap-3 items-center mt-7 md:mt-4">
            <Link
              href="/CreateProfile"
              className="bg-[#033238] text-white px-7 text-sm py-3 rounded-sm cursor-pointer hover:bg-[#05505a] transition-all duration-200 shadow-lg"
            >
              Create your profile
            </Link>

            <Link
              href="/CreateProfile"
              className="border-[#033238] text-[#05505a] px-7 text-sm py-3 rounded-sm cursor-pointer hover:bg-[#05505a] hover:text-white transition-all duration-200 shadow-lg border"
            >
              Explore templates
            </Link>
          </span>
        </div>
        <Testimonial />
      </div>
    </div>
  );
};

export default Home;
