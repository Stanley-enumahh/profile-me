import React from "react";
import { supabase } from "@/supabaseClient";
import ProfileClient from "@/components/profileClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, description, image_url, linkedin, xhandle")
    .eq("id", id)
    .single();

  return {
    title: profile?.name || "Profile-me",
    description: profile?.description || "",
    openGraph: {
      title: profile?.name,
      description: profile?.description,
      images: profile?.image_url ? [profile.image_url] : [],
    },
  };
}

export default async function Profile({ params }: Props) {
  const { id } = await params;

  return <ProfileClient id={id} />;
}
