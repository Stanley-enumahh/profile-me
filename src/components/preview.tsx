import check1 from "@/assets/check_18295118.png";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const LivePreview = ({
  image,
  description,
  xHandle,
  linkedIn,
  name,
}: {
  image: string;
  description: string;
  xHandle: string;
  linkedIn: string;
  name: string;
}) => {
  return (
    <div className="w-full justify-center items-center md:w-[50%] lg:w-[48%] h-fit flex gap-3 flex-col">
      <h2 className="text-lg">Live preview</h2>
      <div className="h-[420px] md:h-[520px] w-full lg:w-[70%] overflow-hidden relative shadow-lg rounded-lg">
        {image && (
          <img
            src={image}
            alt=""
            className="w-full h-full rounded-lg object-cover"
          />
        )}
        <div className="absolute bg-gradient-to-t p-3 md:p-5 h-[210px] md:h-[250px] from-blue-900/80 bottom-0 w-full text-white md:pr-3 gap-2 flex flex-col justify-center">
          {name && (
            <span className="flex flex-row gap-3 items-center">
              <h1 className="font-semibold text-lg md:text-xl capitalize">
                {name}
              </h1>

              <Image
                src={check1}
                alt=""
                className="w-[25px] h-[25px] object-cover"
              />
            </span>
          )}
          {description && (
            <p className="capitalize text-neutral-200 text-sm">{description}</p>
          )}

          <div className="flex flex-row gap-5 text-sm mt-2 md:mt-3">
            {xHandle && (
              <span className="flex flex-row gap-2 items-center">
                <Twitter size={16} />
                <p className="text-xs md:text-sm">{xHandle}</p>
              </span>
            )}

            {linkedIn && (
              <span className="flex flex-row gap-2 items-center">
                <Linkedin size={16} />
                <p className="text-xs md:text-sm">{linkedIn}</p>
              </span>
            )}
          </div>
        </div>
        {/* high profile developer with an eye for detail */}
      </div>
    </div>
  );
};

export default LivePreview;
