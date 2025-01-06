import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { useAuth } from "../context/userContext";
import Image from "../utils/Image";

const PostUpdate = () => {
  const params = useParams();
  
  const [cover, setCover] = useState(""); // For cover image
  const [image, setImage] = useState(""); // For inline image
  const [video, setVideo] = useState(""); // For video
  const [progress, setProgress] = useState(0);
  const [loadingImage, setLoadingImage] = useState(false); 
   // FETCH EXISTING POST DATA
   const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", params.slug],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${params.slug}`);
      return res.data;
    },
    onSuccess: (data) => {
      // Set default values when data is fetched
      setTitle(data.title || "");
      setCategory(data.category || "general");
      setDesc(data.desc || "");
      setValue(data.content || "");
      setCover(data.img || "");
    },
  });
  if(isLoading)return <div>Loading ...</div>
  if(isError)return <div>Error :: {error.message}</div>
  const [title, setTitle] = useState(data?.title); // Default value for title
  const [category, setCategory] = useState(data?.category); // Default value for category
  const [desc, setDesc] = useState(data?.desc); // Default value for description
  const [value, setValue] = useState(data?.content); // For ReactQuill content
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  // IMAGE & VIDEO UPDATES
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

  useEffect(() => {
    if (video) {
      setValue((prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`);
    }
  }, [video]);
  // console.log(data);
  

 

  // POST UPDATE MUTATION
  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/${params.slug}`,
        updatedPost,
        {
          headers: { Authorization: `${token}` },
        }
      );
      console.log("line 71 DATA",data);
      
      return data.post;
    },
    onSuccess: (updatedData) => {
      toast.success("Post updated successfully!");
      navigate(`/${updatedData.slug}`);
    },
    onError: (updatedError) => {
      toast.error("");
      console.log(updatedError.message);
      
      navigate(`/${updatedData.slug}`);
    },
  });

  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      img: cover.filePath || data?.img,
      title,
      category,
      desc,
      content: value,
    };
    // console.log(updatedPost);
    

    mutation.mutate(updatedPost);
  };

  if (!isAuthenticated) {
    return <div>You should login!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  useEffect(() => {
    // Ye code tab chalega jab `cover` state change hoga
    console.log("Cover state updated:", cover);
  }, [cover]); // Dependency array me `cover` state di gayi hai

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Make Updation in a Post</h1>
      <form className="flex flex-col gap-4 flex-1 mb-6" onSubmit={handleSubmit}>
        <Upload setProgress={setProgress} setCover={setCover} type="image">
          <span className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add an updated cover image
          </span>
        </Upload>
        {progress > 0 && progress < 100 && (
          <span>{"Uploading... :: " + progress}</span>
        )}
        {cover?.filePath && (
  <Image
    src={cover.filePath}  // Ye cover.filePath ko directly use karega
    className="rounded-xl"
    w={300}
  />
)}

{!cover?.filePath && data?.img && (
  <Image
    src={data?.img} // Agar cover.filePath nahi hai, to data.img se image display ho
    className="rounded-xl"
    w={300}
  />
)}

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          required
          placeholder="My Awesome Story"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            className="p-2 rounded-xl bg-white shadow-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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
          {
        loadingImage && (
          <div className="absolute w-full left-0 top-0 h-[100vh] bg-black opacity-[.4]"></div>
        )
       }
       {loadingImage && <span className="font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">Uploading wait...</span>} 

        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white font-medium rounded-xl p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={mutation.isPending || (progress > 0 && progress < 100)}
        >
          {mutation.isPending ? "Updating..." : "Update"}
        </button>
        
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default PostUpdate;
