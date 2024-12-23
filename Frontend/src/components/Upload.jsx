import { IKContext, IKUpload } from "imagekitio-react";
import React, { useRef } from "react";
import { toast } from "react-toastify";

//  AUTHENTICATOR OF IMAGE KIT

const authenticator = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

const Upload = ({ children,type,setProgress, setCover }) => {

  const ref=useRef(null);

  //  IMAGE ERROR

  const onError = (err) => {
    console.log("Error in uploading Image ===============>>>>", err);
    toast.error("Image upload failed!");
  };

  //  IMAGE SUCCESS

  const onSuccess = (res) => {
    console.log(res);
    setCover(res);
  };
  //  IMAGE UPLOAD PROGRESS

  const uploadProgress = (progress) => {
    console.log(progress);
    setProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  return (
    <div>
      <IKContext
        publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        authenticator={authenticator}
      >
        {/* ...child components */}

        <IKUpload
          // fileName="test-upload.png"
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess} 
          onUploadProgress={uploadProgress}
          className="hidden"
          ref={ref}
          accept={`${type}/*`}
        />
        <div
        className="cursor-pointer"
         onClick={()=>ref.current.click()} 
         >
          {children}
          </div>
      </IKContext>
    </div>
  );
};

export default Upload;
