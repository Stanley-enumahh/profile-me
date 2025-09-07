"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-scroll";

export const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((c) => !c);
  };
  return (
    <div className="w-full fixed top-0 md:h-fit flex justify-center items-center gap-4 backdrop-blur-2xl">
      <div className="w-[90%] md:w-[80%] flex gap-5 flex-row items-center justify-between py-4">
        <h1 className="font-bold text-lg md:text-2xl text-[#017BF6] z-30">
          Profly
        </h1>

        <ul
          className={`flex flex-col md:border-0 border-b shadow-xl md:shadow-none border-b-[#017BF6] md:static absolute md:flex-row text-neutral-200 transition-all duration-200 justify-center items-center text-sm gap-5 ${
            isOpen
              ? "top-[50px] right-0 h-[120px] w-full bg-[#001C37]"
              : "top-[-100%] left-0 w-full"
          }`}
        >
          <Link
            to="section1"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="section1"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            Vision
          </Link>
        </ul>
        <Menu
          onClick={handleIsOpen}
          size={16}
          className="flex md:hidden text-white z-30"
        />
      </div>
    </div>
  );
};
