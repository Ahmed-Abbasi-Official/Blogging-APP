import { IKImage } from "imagekitio-react";
import React from "react";

const Image = ({ src, className, alt,w,h }) => {
  return (
    <>
      <IKImage
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
        path={src}
        className={className}
        alt={alt}
        loading="lazy"
        lqip={{ active: true, quality: 20 }}
        width={w}
        height={h}
      />
    </>
  );
};

export default Image;
