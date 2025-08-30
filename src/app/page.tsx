import Link from "next/link";

const Home = () => {
  return (
    <div className="flex  w-full h-screen justify-center">
      <div className="w-[87%] md:w-[80%] flex flex-col gap-5 mt-[70px] md:mt-[120px] items-center">
        <h1 className="font-bold text-2xl md:text-4xl text-center leading-[30px] md:leading-[45px]">
          Launch your profile online in minutes <br /> no design or coding
          skills needed
        </h1>
        <p className="text-black/80 text-sm w-[90%] md:w-[60%] text-center">
          Build and publish a beautiful profile page without writing a single
          line of code. Perfect for showcasing yourself, your work, or your
          business - fast, simple, and ready to share.
        </p>
        <Link
          href="/CreateProfile"
          className="bg-[#033238] text-white px-7 py-3 rounded-3xl cursor-pointer mt-7 md:mt-4 hover:bg-[#05505a] transition-all duration-200 shadow-lg"
        >
          Create your profile
        </Link>
      </div>
    </div>
  );
};

export default Home;
