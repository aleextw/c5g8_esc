import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function PhotoGallery(props) {
  return (
    <div>
      <ImageGallery items={props.images} useBrowserFullscreen={false} />;
    </div>
  );
}

export default PhotoGallery;
