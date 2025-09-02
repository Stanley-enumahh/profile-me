"use client";

import { Linkedin, Twitter } from "lucide-react";
import check1 from "@/assets/check_18295118.png";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { Skeleton } from "./ui/skeleton";

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
      <div className="h-screen w-full flex justify-center items-center">
        <Skeleton className="h-[450px] w-[350px] mt-[40px] md:mt-[100px] rounded-lg" />
      </div>
    );
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="h-[80%] md:h-[460px] w-[87%] md:w-[350px] mt-[40px] md:mt-[100px] overflow-hidden relative shadow-lg rounded-lg border border-[#343434]">
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
            }99, transparent)`,
          }}
          className="absolute bg-gradient-to-t p-3 md:p-4 h-[240px] md:h-[200px] bottom-0 w-full text-white pr-3 gap-2 flex flex-col justify-center"
        >
          <span className="flex flex-row gap-3 items-center">
            <h1 className="font-semibold text-lg capitalize">{profile.name}</h1>

            <Image
              src={check1}
              alt=""
              className="w-[25px] h-[25px] object-cover"
            />
          </span>
          <p className=" leading-[20px] md:leading-[21px] text-neutral-300 text-xs md:text-sm">
            {profile.description}
          </p>
          <div className="flex flex-row gap-3 md:gap-5 text-xs md:text-sm mt-3">
            <span className="flex flex-row gap-2 items-center">
              <Twitter size={16} />
              <p>{profile.xhandle}</p>
            </span>
            <span className="flex flex-row gap-2 items-center">
              <Linkedin size={16} />
              <p>{profile.linkedin}</p>
            </span>
          </div>
        </div>
        {/* high profile developer with an eye for detail */}
      </div>
    </div>
  );
}
