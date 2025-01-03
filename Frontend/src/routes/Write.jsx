import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const {isAuthenticated,token}=useAuth();
  const navigate = useNavigate();

  //  IMAGE

  useEffect(() => {
    image && setValue((prev)=>prev+`<p><img src="${image.url}"  /></p>`)
  }, [image])

  //  VIDEO

  useEffect(() => {
    video && setValue((prev)=>prev+`<p><iframe class="ql-video " src="${image.url}" /></p>`)
  }, [video])

  // MUTAION FUNCTIONALITY

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      // const token = await getToken();
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
      // console.log("Post created successfully:", data);
      // alert("Post created successfully!");
      toast.success("Post created successfully");
      navigate(`/${data.slug}`);
    },
  });

  // if (!isLoaded) {
  //   return <div>Loading .....</div>;
  // }

  if ( !isAuthenticated) {
    return <div>You should login!</div>;
  }

  // HANDLE SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      img:cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    // console.log("Submitting post:", newPost);
    setValue(' ')
    // Trigger mutation
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
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
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
            <Upload setProgress={setProgress} setCover={setImage} type="image">
              📷
            </Upload>
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
        <button
          type="submit"
          className="bg-blue-800 text-white font-medium rounded-xl p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={mutation.isPending || (0 < progress && 100 < progress)}
        >
          {mutation.isPending ? "Sending..." : "Send"}
        </button>
        {"Progress :: " + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
