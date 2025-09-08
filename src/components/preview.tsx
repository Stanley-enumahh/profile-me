import check1 from "@/assets/check_18295118.png";
import { getLinkedInUsername } from "@/lib/getIinkedInUsername";
import { getXUsername } from "@/lib/getXusername";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const LivePreview = ({
  image,
  description,
  xHandle,
  linkedIn,
  name,
  bgColor,
}: {
  image: string;
  description: string;
  xHandle: string;
  linkedIn: string;
  name: string;
  bgColor: string;
}) => {
  return (
    <div className="w-full justify-center items-center md:w-[50%] lg:w-[48%] h-fit flex gap-3 flex-col">
      <h2 className="text-lg text-neutral-200">Live preview</h2>
      <div className="h-[500px] md:h-[550px] w-full lg:w-[95%] overflow-hidden relative shadow-lg rounded-lg">
        {image && (
          <img
            src={image}
            alt=""
            className="w-full h-full rounded-lg object-cover"
          />
        )}
        <div
          style={{
            backgroundImage: `linear-gradient(to top, ${bgColor}cc, transparent)`,
          }}
          className="absolute bg-gradient-to-t p-3 md:p-5 h-[210px] md:h-[250px] bottom-0 w-full text-white md:pr-3 gap-3 flex flex-col justify-center"
        >
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
            <p className="capitalize text-neutral-200 text-sm leading-[19px] md:leading-[22px]">
              {description}
            </p>
          )}

          <div className="flex flex-row gap-5 text-sm mt-2 md:mt-3">
            {xHandle && (
              <span className="flex flex-row gap-2 items-center">
                <Twitter size={16} />
                <p className="text-xs md:text-sm">{getXUsername(xHandle)}</p>
              </span>
            )}

            {linkedIn && (
              <span className="flex flex-row gap-2 items-center">
                <Linkedin size={16} />
                <p className="text-xs md:text-sm">
                  {getLinkedInUsername(linkedIn)}
                </p>
              </span>
            )}
          </div>
        </div>
        {/* high profile designer with an eye for detail, i help start ups rech goals on time, within budget and with high quality 
        
        https://x.com/stanlee0nX
        
        
        https://www.linkedin.com/in/stanley-enumah01/*/}
      </div>
    </div>
  );
};

export default LivePreview;
