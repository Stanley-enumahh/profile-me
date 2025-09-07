"use client";

import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
import { Linkedin, Twitter } from "lucide-react";
import check1 from "@/assets/check_18295118.png";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { Skeleton } from "./ui/skeleton";
import { getXUsername } from "@/lib/getXusername";
import { getLinkedInUsername } from "@/lib/getIinkedInUsername";
import { LoaderFive } from "./ui/loader";
import Link from "next/link";

async function fetchProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export default function ProfileClient({ id }: { id: string }) {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
  });

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center gap-4 flex-col">
        <LoaderFive text=" Loading your profile..." />;
        <Skeleton className="h-[450px] w-[350px] rounded-lg" />
      </div>
    );
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="w-full h-screen flex md:flex-row justify-center bg-gradient-to-t to-[#b061c5] from-[#41558c] items-center flex-col gap-4 md:gap-8">
      <p
        className={`md:text-sm flex flex-row items-center gap-1 text-sm ${dancingScript.className} text-white fixed top-[30px] md:top-[57%] md:right-[39%]`}
      >
        Made with
        <Link href="/" className="underline">
          profile me
        </Link>
      </p>
      <div className="bg-[#ebebeb] h-[500px] shadow-xl md:h-[460px] w-[90%] p-2  md:w-[350px] mt-[40px] overflow-hidden relative rounded-xl">
        <div className="h-full w-full overflow-hidden relative shadow-lg rounded-xl">
          {profile.image_url && (
            <img
              src={profile.image_url}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          )}
          <div
            style={{
              backgroundImage: `linear-gradient(to top, ${
                profile.bg_color || "#1E40AF"
              }CC, transparent)`,
            }}
            className="absolute rounded-xl bottom-0 bg-gradient-to-t md:p-3 p-2 h-[200px] md:h-[200px] w-[334px] text-white pr-3 gap-2 flex flex-col justify-center"
          >
            <span className="flex flex-row gap-3 items-center">
              <h1 className="font-semibold text-lg capitalize">
                {profile.name}
              </h1>

              <Image
                src={check1}
                alt=""
                className="w-[25px] h-[25px] object-cover"
              />
            </span>
            <p className="leading-[18px] md:leading-[21px] text-neutral-200 text-xs md:text-sm">
              {profile.description}
            </p>
            <div className="flex flex-row gap-3 md:gap-5 text-xs md:text-sm mt-3">
              <span className="flex flex-row gap-2 items-center">
                <Twitter size={16} />

                <p className="text-xs md:text-xs">
                  {getXUsername(profile.xhandle)}
                </p>
              </span>
              <span className="flex flex-row gap-2 items-center">
                <Linkedin size={16} />

                <p className="text-xs md:text-xs">
                  {getLinkedInUsername(profile.linkedin)}
                </p>
              </span>
            </div>
          </div>
          {/* high profile developer with an eye for detail */}
        </div>
      </div>

      <span className="flex flex-row gap-3">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={profile.xhandle}
          className="w-[140px] flex items-center justify-center py-3 bg-blue-800 text-white rounded-xl text-xs md:text-sm shadow-lg"
        >
          Visit Twitter
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={profile.linkedin}
          className="w-[140px] flex items-center justify-center py-3 bg-[#ebebeb] text-black rounded-xl text-xs md:text-sm shadow-lg"
        >
          Visit LinkedIn
        </a>
      </span>
    </div>
  );
}
