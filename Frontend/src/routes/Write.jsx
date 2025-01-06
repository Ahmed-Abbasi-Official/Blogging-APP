import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { useAuth } from "../context/userContext";

const Write = () => {
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingImage, setLoadingImage] = useState(false); 
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  // IMAGE
  useEffect(() => {
     // Set loading to true when image is being added
     if (image) {
    console.log(loadingImage);
      setValue((prev) => {
        const newValue = prev + `<p><img src="${image.url}"  /></p>`;
        setLoadingImage(false); // Set loading to false after image is added
        return newValue;
      });
    }
  }, [image]);
  

  // VIDEO
  useEffect(() => {
    if (video) {
      setValue((prev) => prev + `<p><iframe class="ql-video " src="${video.url}" /></p>`);
    }
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        newPost,
        {
          headers: { Authorization: `${token}` },
        }
      );
      return data.post;
    },
    onSuccess: (data) => {
      toast.success("Post created successfully");
      navigate(`/${data.slug}`);
    },
  });

  if (!isAuthenticated) {
    return <div>You should login!</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };
    setValue(" ");
    mutation.mutate(newPost);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>
      <form className="flex flex-col gap-4 flex-1 mb-6" onSubmit={handleSubmit}>
        <Upload setProgress={setProgress} setCover={setCover} type="image">
          <span className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </span>
        </Upload>
        {progress > 0 && progress < 100 && (
          <span>{"Uploading... :: " + progress}</span>
        )}
        <input
          className="text-2xl sm:text-4xl font-semibold bg-transparent outline-none"
          type="text"
          required
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select name="category" className="p-2 rounded-xl bg-white shadow-md">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md outline-none"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
           <span onClick={()=>setLoadingImage(true)}>
           <Upload setProgress={setProgress} setCover={setImage} type="image" >
              📷
            </Upload>
           </span>
            <Upload setProgress={setProgress} setCover={setVideo} type="video">
              🎦
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="flex-1 rounded-xl bg-white shadow-md"
          />
        </div>

       {
        loadingImage && (
          <div className="absolute w-full left-0 top-0 h-full bg-black opacity-[.4]"></div>
        )
       }
       {loadingImage && <span className="font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">Uploading wait...</span>} 

        <button
          type="submit"
          className="bg-blue-800 text-white font-medium rounded-xl p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
        >
          {mutation.isPending ? "Sending..." : "Send"}
        </button>

        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
