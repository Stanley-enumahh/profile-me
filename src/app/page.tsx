import { Testimonial } from "@/components/testimonials";
import { TopNav } from "@/components/topNav";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex w-full h-fit justify-center">
      <TopNav />
      <div className="w-[87%] md:w-[80%] h-fit flex flex-col gap-10 items-center ">
        {/* hero section */}
        <div className="w-full flex h-[450px] flex-col gap-7 md:mt-[140px] mt-[120px] items-center">
          <h1 className="font-bold text-2xl text-white md:text-5xl text-center leading-[30px] md:leading-[55px]">
            Launch your profile online in minutes <br /> no design or coding
            skills needed
          </h1>
          <p className="text-neutral-200 text-sm w-[90%] md:w-[60%] text-center">
            Build and publish a beautiful profile page without writing a single
            line of code. Perfect for showcasing yourself, your work, or your
            business - fast, simple, and ready to share.
          </p>

          <span className="flex flex-row gap-3 md:text-sm text-xs items-center mt-7 md:mt-4">
            <Link
              href="/CreateProfile"
              className="bg-[#017BF6] text-white px-3 md:px-7 py-3 rounded-sm cursor-pointer hover:bg-[#05505a] transition-all duration-200 shadow-lg"
            >
              Create your profile
            </Link>

            <Link
              href="/CreateProfile"
              className=" text-white px-3 md:px-7 py-3 rounded-sm cursor-pointer bg-[#099137] transition-all duration-200 shadow-lg"
            >
              Explore templates
            </Link>
          </span>
        </div>
        {/* <Testimonial /> */}

        <section id="section1" className="">
          <h1 className="text-white">Features</h1>
        </section>
      </div>
    </div>
  );
};

export default Home;
