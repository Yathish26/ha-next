"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import DataBank from "@/Data/Bank";
import Header from "@/app/parts/Header";
import Footer from "@/app/parts/Footer";
import { leagueSpartan } from "@/lib/font";

const TiptapEditor = dynamic(() => import("./TiptapEditor"), {
  ssr: false,
});

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState("default");
  const [imageurlShow, setImageurlShow] = useState(false);
  const [imageurl, setImageurl] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const uploadCoverImage = async () => {
    if (!coverImage) return { imageUrl: null, imageId: null };
    const formData = new FormData();
    formData.append("image", coverImage);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { url: imageUrl, fileId: imageId } = response.data.data;
      return { imageUrl, imageId };
    } catch (error) {
      setError("Error uploading cover image");
      console.error("Error uploading cover image:", error);
      return null;
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setButtonState("uploading");

    let imageUrl = null;
    let imageId = null;

    if (coverImage && typeof coverImage === "object") {
      const uploadResult = await uploadCoverImage();
      imageUrl = uploadResult.imageUrl;
      imageId = uploadResult.imageId;

      if (!imageUrl || !imageId) {
        setLoading(false);
        setButtonState("error");
        return;
      }
    } else if (imageurl && isValidURL(imageurl)) {
      imageUrl = imageurl;
    }

    const blogData = {
      title,
      description,
      category,
      coverImage: imageUrl,
      imageId,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setTitle("");
        setDescription("");
        setCoverImage(null);
        setCategory("");
        setButtonState("success");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error posting blog");
      console.error("Error posting blog:", error);
      setButtonState("error");
    } finally {
      setLoading(false);
    }
  };

  const buttonStyles = {
    default: "bg-purple-700 hover:bg-purple-800",
    uploading: "bg-blue-500 cursor-not-allowed",
    success: "bg-green-500 hover:bg-green-600",
    error: "bg-red-500 hover:bg-red-600",
  };

  const buttonText = {
    default: "Post Blog",
    uploading: (
      <div className="flex gap-2 justify-center items-center">
        <p>Uploading</p>
        <span className="loaderadd"></span>
      </div>
    ),
    success: "Posted",
    error: "Error",
  };

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setTitle(e.target.value);
  };

  const handleFetchImageURL = () => {
    if (isValidURL(imageurl)) {
      setCoverImage(imageurl);
      setError("");
    } else {
      setError("Please provide a valid image URL");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCoverImagePreview(fileUrl);
    }
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (buttonState === "success") {
      router.push("/blog/user");
      const timeout = setTimeout(() => setButtonState("default"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [buttonState]);

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col px-[25%] mo:px-7 mo:py-10 py-20 bg-gradient-to-b from-[#FFF2FF] to-[#F4DCFF]">
        <form onSubmit={handlePost} className="space-y-6">
          {error && <div className="text-red-500 text-center">{error}</div>}

          <textarea
            value={title}
            onChange={handleInput}
            maxLength={200}
            placeholder="Enter blog title"
            className={`text-5xl py-3 ${leagueSpartan.className} mo:text-4xl font-semibold w-full bg-transparent outline-none placeholder-gray-400 text-gray-900 resize-none`}
            rows={1}
            style={{ overflow: "hidden" }}
          />

          <select
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
            className={`text-lg ${leagueSpartan.className} bg-[#F4DCFF] py-2 px-4 rounded-md w-fit outline-none text-gray-900`}
          >
            <option value="" disabled>Select Category</option>
            {DataBank().blogCategories.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>

          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="cover-image-upload"
              className="hidden"
            />

            {coverImage && (
              <img
                draggable="false"
                src={coverImagePreview || coverImage}
                className="h-64 w-64 object-cover"
                alt="Cover Image Preview"
              />
            )}

            <div className="flex gap-4">
              <label htmlFor="cover-image-upload" className="cursor-pointer w-fit py-2 px-6 bg-purple-700 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition-all duration-300">
                Cover Image
              </label>

              <button
                type="button"
                onClick={() => setImageurlShow(!imageurlShow)}
                className={`cursor-pointer w-fit py-2 px-6 ${imageurlShow ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"} text-white rounded-md text-sm font-semibold transition-all duration-300`}
              >
                URL Image
              </button>
            </div>

            {imageurlShow && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={imageurl}
                    maxLength={500}
                    onChange={(e) => setImageurl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 m-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleFetchImageURL}
                    className="py-2 px-4 bg-purple-700 text-white rounded-md text-sm font-semibold hover:bg-purple-800 transition-all duration-300"
                  >
                    Fetch
                  </button>
                </div>
              </div>
            )}
          </div>

          <TiptapEditor
            content={description}
            onChange={setDescription}
            placeholder="Write Blog ....."
          />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-fit py-2 px-6 text-white font-semibold rounded-3xl focus:outline-none focus:ring-2 focus:ring-opacity-50 ${buttonStyles[buttonState]}`}
            >
              {buttonText[buttonState]}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
