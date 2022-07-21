import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Box } from "@chakra-ui/react";

function PhotoGallery(props) {
  return (
    <Box width="80%" ml="auto" mr="auto">
      <ImageGallery items={props.images} useBrowserFullscreen={false} />;
    </Box>
  );
}

export default PhotoGallery;
