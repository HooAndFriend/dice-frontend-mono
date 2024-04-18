// ** React Imports
import { ChangeEvent, useEffect, useRef } from "react";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { UploadFileResponse } from "@/src/type/component";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  qaId: number;
  refetch: () => void;
}

export const QaFileUploader = ({ qaId, refetch }: PropsType) => {
  const { handleOpen } = useDialog();

  const inputRef = useRef<HTMLInputElement | any>(null);

  const saveQaFile = useSWRMutation(
    "/v1/qa/file",
    async (url: string, { arg }: { arg: string }) =>
      await Post<CommonResponse<void>>(url, { url: arg, qaId }),
    {
      onSuccess: () => {
        refetch();
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
        saveQaFile.trigger(data.url);
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
    clearInput();
  }, []);

  return (
    <div>
      <div
        className="w-[40px] h-[40px] mr-4 rounded-[6px] bg-[#D9E0FF] font-bold flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        +
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};
