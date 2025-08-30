import { Linkedin, Twitter } from "lucide-react";
import check1 from "@/assets/check_18295118.png";
import { fetchProfile } from "@/fetchProfile";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { supabase } from "@/supabaseClient";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, description, image_url, linkedin, xhandle")
    .eq("id", params.id)
    .single();

  return {
    title: profile?.name || "Profile",
    description: profile?.description || "",
    openGraph: {
      title: profile?.name,
      description: profile?.description,
      images: profile?.image_url ? [profile.image_url] : [],
    },
  };
}

export default async function Profile({ params }: Props) {
  const { id } = params;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  console.log(profile);

  // if (isLoading) return <p>Loading...</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="h-[500px] w-[360px] overflow-hidden relative shadow-lg rounded-lg border border-[#343434]">
      {profile.image_url && (
        <img
          src={profile.image_url}
          alt=""
          className="w-full h-full rounded-lg object-cover"
        />
      )}
      <div className="absolute bg-gradient-to-t p-5 h-[250px] from-blue-900/80  bottom-0 w-full text-white pr-3 gap-2 flex flex-col justify-center">
        <span className="flex flex-row gap-3 items-center">
          <h1 className="font-semibold text-xl capitalize">{profile.name}</h1>

          <Image
            src={check1}
            alt=""
            className="w-[25px] h-[25px] object-cover"
          />
        </span>
        <p className="capitalize text-neutral-300">{profile.description}</p>
        <div className="flex flex-row gap-5 text-sm mt-3">
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
  );
}
