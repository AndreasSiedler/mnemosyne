import React, { ReactElement, useState } from "react";
import { FileError } from "react-dropzone";
import { Box, SimpleGrid } from "@chakra-ui/react";
import DynamicImage from "../DynamicImage";
import ImageDropzone from "./ImageDropZone";
import UploadError from "./UploadError";
import SingleFileUploadWithProgress from "./FileHeaderWithProgress";
import { map } from "lodash";
import { Image as TImage } from "../../API";

export interface UploadableFile {
  file: File;
  errors: FileError[];
  key?: string;
}

export interface ImageDropzoneProps {
  imgs: TImage[];
}

/**
 * Renders an Image file manager
 * @return {ReactElement}
 */
export default function ImageManager({ imgs = [] }: ImageDropzoneProps): ReactElement {
  const [images, setImages] = useState<UploadableFile[]>([]);

  // Logic
  function onDelete(file: File) {
    setImages((currFiles) => currFiles.filter((fw) => fw.file !== file));
  }

  function onFileUpload(file: File, key: string) {
    setImages((currFiles) =>
      currFiles.map((fw) => {
        if (fw.file === file) {
          return { ...fw, key };
        }
        return fw;
      })
    );
  }

  return (
    <>
      <SimpleGrid mt={5} columns={3}>
        {map(imgs, (img) => {
          return (
            <Box boxSize={"200"} position={"relative"}>
              <DynamicImage imageKey={img.fullSize.key} />
            </Box>
          );
        })}
        {map(images, (fw, idx) => (
          <>
            {fw.errors.length ? (
              <UploadError key={idx} file={fw.file} errors={fw.errors} onDelete={onDelete} />
            ) : (
              <SingleFileUploadWithProgress
                key={idx}
                file={fw.file}
                onDelete={onDelete}
                onUpload={onFileUpload}
              />
            )}
          </>
        ))}
        <ImageDropzone setImages={setImages} />
      </SimpleGrid>
    </>
  );
}
