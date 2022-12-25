import { Grid, Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FileError } from "react-dropzone";
import { Image } from "../../API";
import DynamicImage from "../DynamicImage";
import ImageDropzone from "./ImageDropZone";

export interface UploadableFile {
  file: File;
  errors: FileError[];
  key?: string;
}

export interface ImageDropzoneProps {
  images: Image[];
}

/**
 * Renders an Image file manager
 * @return {ReactElement}
 */
export default function ImageManager({ images = [] }: ImageDropzoneProps): ReactElement {
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {images.map((img) => (
          <Box key={img.id} w="100%">
            {/* ToDO: OnDelet btton */}
            <DynamicImage imageKey={img.fullSize.key} />
          </Box>
        ))}
      </Grid>
      <ImageDropzone />
    </>
  );
}
