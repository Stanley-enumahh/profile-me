import { supabase } from "@/supabaseClient";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, description, image_url, linkedin, xhandle")
    .eq("id", params.id)
    .single();

  return {
    title: profile?.name || "User Profile",
    description: profile?.description || "View user profile",
    openGraph: {
      title: profile?.name,
      description: profile?.description,
      images: profile?.image_url ? [profile.image_url] : [],
    },
  };
}
