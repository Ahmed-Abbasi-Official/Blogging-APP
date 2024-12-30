import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/userContext";

const PostMenuActions = ({ post }) => {
  const { token,isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // console.log(post);
  

  //  Fetching SavedPOSTS

  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return await axios.get(`${import.meta.env.VITE_API_URL}/user/saved`, {
        headers: {
          Authorization: `${token}`,
        },
      });
    },
  });


  console.log(savedPosts);
  
  const isSaved = savedPosts?.some((p) =>p._id==post._id) ? true : false;

 

  console.log(isSaved);
  //  GET USER

  const {
    isPending: isAdminPending,
    error: adminError,
    data: adminData,
  } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => {
      // const token = await getToken();
      return await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
    },
  });
  
  const isAdmin = adminData?.data.user.role==="admin" ? true :false ;
  // console.log(isAdmin);
  // console.log(adminData?.data.userData);
  
  
 
  

  //  DELETE POSTS

  const deleteMutation = useMutation({
    mutationFn: async () => {
      // const token = await getToken();
      // console.log(token);
      
      const rs= axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return rs.data
    },
    onSuccess: (data,id) => {
      // console.log(data,id);
      
      toast.success("Post deleted successfully");
      navigate("/");
    },
    onError: () => {
      toast.error(error.response.data);
    },
  });

  const queryClient = useQueryClient();

  //  SAVE POST MUTATION

  const saveMutation = useMutation({
    mutationFn: async () => {
      // const token = await getToken();
      const res= await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/save`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization:`${token}`,
          },
        }
      );
      return res.data
    },
    onSuccess: (data) => {
      toast.success(isSaved  ? "Post Un-Saved" : "Post Saved");
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
      
    },
    onError: () => {
      toast.error(error.response.data);
    },
  });

  

  //  FEATURED

  const featureMutation = useMutation({
    mutationFn: async () => {
      // const token = await getToken();
      return  await axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/feature`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };
  const handleSave = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    saveMutation.mutate();
    navigate('/saved-posts')
  };
  const handleFeature = () => {
    featureMutation.mutate();
  };

  return (
    <div className="">
      <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>
      {/* SAVE POST */}
      {isAdminPending ? (
        "Loading..."
      ) : adminError ? (
        "Saved Post Fetching Failed!"
      ) : (
        <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSave}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
  d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
  stroke="black"
  strokeWidth="2"
  fill={
    saveMutation.isPending
                  ? isSaved
                    ? "none"
                    : "black"
                  : isSaved
                  ? "black"
                  : "none"
  }
/>
          </svg>
          <span>Save this Post</span>
          {saveMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
      {/* DELETE POST */}
      {isAuthenticated && (post?.user?.username === adminData?.data.userData?.username || isAdmin===true ) && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="red"
            width="20px"
            height="20px"
          >
            <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
          </svg>
          <span>Delete this Post</span>
          {deleteMutation.isPending && (
            <span className="text-xs">(in Progress)</span>
          )}
        </div>
      )}
       {isAdmin && (
        <div
          className="flex items-center gap-2 py-2 text-sm cursor-pointer"
          onClick={handleFeature}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path
              d="M24 2L29.39 16.26L44 18.18L33 29.24L35.82 44L24 37L12.18 44L15 29.24L4 18.18L18.61 16.26L24 2Z"
              stroke="black"
              strokeWidth="2"
              fill={
                featureMutation.isPending
                  ? post.isFeatured
                    ? "none"
                    : "black"
                  : post.isFeatured
                  ? "black"
                  : "none"
              }
            />
          </svg>
          <span>Feature</span>
          {featureMutation.isPending && (
            <span className="text-xs">(in progress)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PostMenuActions;
