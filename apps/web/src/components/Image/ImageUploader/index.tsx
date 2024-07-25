"use client";

// ** React Imports
import { ChangeEvent, useEffect, useRef } from "react";

// ** Component Imports
import ImageUploaderView from "./image-uploader";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import { Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Type Imports
import { UploadFileResponse } from "@/src/type/component";

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

  const { handleOpen } = useDialog();

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
      const formData = new FormData();
      formData.append("file", file);

      uploadFile.trigger(formData);
    }
  };

  const uploadFile = useSWRMutation(
    "/file/v1/upload",
    async (url: string, { arg }: { arg: FormData }) =>
      await Post<UploadFileResponse>(url, arg),
    {
      onSuccess: ({ data }) => {
        setPath(data.url);
      },
      onError: (error) => {
        handleOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

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
