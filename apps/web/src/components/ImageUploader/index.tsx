// ** React Imports
import { ChangeEvent, useEffect, useRef } from "react";

// ** Aws Imports
import AWS from "aws-sdk";

// ** Component Imports
import ImageUploaderView from "./image-uploader";

interface PropsType {
  image: string;
  width?: string;
  height?: string;
  boxColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string | number;
  mode?: "write" | "edit";
  setPath: (e: string) => void;
}
export const ImageUploader = ({
  setPath,
  image,
  boxColor,
  borderRadius,
  width,
  height,
  borderColor,
  borderWidth,
  mode,
}: PropsType) => {
  const inputRef = useRef<HTMLInputElement | any>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const handleClick = () => {
    if (inputRef) {
      inputRef.current.click();
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY,
        endpoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
        s3ForcePathStyle: true,
        signatureVersion: "v4",
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME,
        Key: file.name,
        Body: file,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          return;
        }
        setPath(data.Location);
      });
    }
  };

  useEffect(() => {
    if (image === "") {
      clearInput();
    }
  }, [image]);

  return (
    <ImageUploaderView
      handleClick={handleClick}
      boxColor={boxColor}
      borderRadius={borderRadius}
      handleImageChange={handleImageChange}
      inputRef={inputRef}
      image={image}
      width={width}
      height={height}
      borderColor={borderColor}
      borderWidth={borderWidth}
      mode={mode}
    />
  );
};
