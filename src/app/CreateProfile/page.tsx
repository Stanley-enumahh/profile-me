"use client";

import { useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/supabaseClient";
import { toast } from "sonner";
import LivePreview from "@/components/preview";
import { truncateUrl } from "@/lib/trucateUrl";
import { Link } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export type ProfileFormValues = {
  name: string;
  description: string;
  xHandle: string;
  linkedIn: string;
  image: FileList;
  bgColor: string;
};

const colors = [
  "#05505a",
  "#1446e6",
  "#9333ea",
  "#dc2626",
  "#16a34a",
  "#f59e0b",
  "#111827",
];

const InputLabel = ({ htmlFor, text }: { htmlFor: string; text: string }) => {
  return (
    <label htmlFor={htmlFor} className="md:text-sm text-xs text-black/80">
      {text}
    </label>
  );
};

export default function CreateProfile() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState<null | string>(null);

  const handleCopy = async () => {
    if (url && !copied) {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  };

  const name = watch("name") || "";
  const description = watch("description") || "";
  const xHandle = watch("xHandle");
  const linkedIn = watch("linkedIn");

  const handleImageUpload = async (file: File) => {
    const filePath = `public/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile-images").getPublicUrl(filePath);

    return publicUrl;
  };

  const createProfile = async (values: ProfileFormValues) => {
    let imageUrl = null;

    if (values.image && values.image[0]) {
      imageUrl = await handleImageUpload(values.image[0]);
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          name: values.name,
          description: values.description,
          xhandle: values.xHandle,
          linkedin: values.linkedIn,
          image_url: imageUrl,
          bg_color: values.bgColor,
        },
      ])
      .select("id");

    if (error) throw error;

    const profileId = data[0].id;
    return `${window.location.origin}/profile-card/${profileId}`;
  };

  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess: (link) => {
      setUrl(link);
      toast.success("Profile created!");
    },
    onError: () => {
      toast.error("Something went wrong while creating profile.");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", e.target.files as FileList);
    }
  };
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col mb-[100px] w-[90%] md:w-[85%] h-fit mt-[40px] gap-6 items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          Create your professional profile
        </h1>
        <div className="flex flex-col gap-14 md:flex-row justify-between w-full h-full">
          <div className="flex flex-col w-full md:w-[50%] lg:w-[55%] h-full gap-3 px-4 py-7  rounded-xl bg-white">
            <h2 className="text-[16px] md:text-lg">Fill in the your info.</h2>
            <form
              onSubmit={handleSubmit((values) => mutation.mutate(values))}
              className="h-fit w-full flex flex-col gap-5"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-[100px] h-[100px] rounded-lg object-cover"
                />
              ) : (
                <span
                  onClick={() => fileInputRef.current?.click()}
                  className="h-[100px] text-xs flex justify-center items-center text-center w-[100px] cursor-pointer text-white rounded-lg bg-[#05505a]"
                >
                  click to select profile image
                </span>
              )}
              {/* Hidden File Input */}{" "}
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image", {
                    required: "Image is required",
                    onChange: handleImageChange,
                  })}
                  ref={fileInputRef}
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <InputLabel text="Name" htmlFor="name" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  maxLength={20}
                  className="placeholder:md:text-sm placeholder:text-xs md:text-sm text-xs"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: { value: 20, message: "Max 30 characters" },
                  })}
                />
                <p className="text-xs text-black/50 font-semibold">
                  {" "}
                  {name.length}/20
                </p>
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <InputLabel text="Description" htmlFor="description" />
                <Textarea
                  id="description"
                  placeholder="Tell about yourself"
                  maxLength={150}
                  className="placeholder:md:text-sm placeholder:text-xs h-[80px] md:text-sm text-xs "
                  {...register("description", {
                    required: "Description is required",
                    maxLength: { value: 150, message: "Max 200 characters" },
                  })}
                />
                <p className="text-xs text-black/50 font-semibold">
                  {description.length}/150
                </p>
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* handles */}
              <div className="flex flex-col gap-2">
                <InputLabel text="X Handle" htmlFor="xHandle" />

                <Input
                  id="xHandle"
                  placeholder="@username"
                  {...register("xHandle", {
                    required: "Please enter X handle",
                  })}
                  className="placeholder:md:text-sm placeholder:text-xs md:text-sm text-xs"
                />

                {errors.xHandle && (
                  <p className="text-red-500 text-xs">
                    {errors.xHandle.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <InputLabel text="linkedIn" htmlFor="LinkedIn Handle" />

                <Input
                  id="linkedIn"
                  placeholder="linkedin.com/in/yourname"
                  {...register("linkedIn", {
                    required: "Please enter LinkedIn",
                  })}
                  className="placeholder:md:text-sm placeholder:text-xs md:text-sm text-xs"
                />
                {errors.linkedIn && (
                  <p className="text-red-500 text-xs">
                    {errors.linkedIn.message}
                  </p>
                )}
              </div>
              {/* coolers */}
              <div className="flex flex-col gap-2">
                <InputLabel text="Choose Background Color" htmlFor="bgColor" />
                <div className="flex flex-wrap gap-4">
                  {colors.map((color) => (
                    <span
                      key={color}
                      onClick={() => setValue("bgColor", color)}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 transition 
                            ${
                              watch("bgColor") === color
                                ? " scale-120"
                                : "border-gray-300"
                            }
                          `}
                      style={{ backgroundColor: color }}
                    ></span>
                  ))}
                </div>
              </div>
              {/* displayed url */}
              {url && (
                <div className="flex flex-row justify-between items-center bg-blue-200 h-[60px] py-2 px-2 rounded-lg">
                  <span className="border-r flex justify-between items-center px-5 h-full border-gray-400">
                    <Link className="text-black/50" />
                  </span>

                  <p className="text-sm text-black/60">{truncateUrl(url)}</p>

                  <button
                    onClick={handleCopy}
                    type="button"
                    disabled={!url || copied}
                    className="cursor-pointer disabled:bg-blue-700/50 bg-blue-700 text-xs md:text-sm h-full px-4 rounded-lg text-white hover:bg-blue-700/80 transition-all duration-200"
                  >
                    Copy Link
                  </button>
                </div>
              )}
              <span className="flex flex-row w-full justify-center items-center gap-5">
                {!url ? (
                  <button
                    disabled={mutation.isPending}
                    type="submit"
                    className="mt-2 cursor-pointer bg-[#033238] text-xs md:text-sm px-6 py-2 rounded-xl text-white hover:bg-[#033238]/80 transition-all duration-200"
                  >
                    {mutation.isPending ? "Generating..." : "Generate Link"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-2 cursor-pointer bg-[#033238] text-xs md:text-sm px-6 py-2 rounded-xl text-white hover:bg-[#033238]/80 transition-all duration-200"
                  >
                    Clear form
                  </button>
                )}
              </span>
            </form>
          </div>

          <LivePreview
            image={previewImage || ""}
            description={description}
            xHandle={xHandle}
            linkedIn={linkedIn}
            name={name}
            bgColor={watch("bgColor") || "#1446e6"}
          />
        </div>
      </div>
    </div>
  );
}
