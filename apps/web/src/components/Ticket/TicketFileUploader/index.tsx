// ** React Imports
import { ChangeEvent, useEffect, useRef } from "react";

// ** Aws Imports
import AWS from "aws-sdk";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  ticketId: number;
  refetch: () => void;
}

const TicketFileUploader = ({ ticketId, refetch }: PropsType) => {
  const { handleOpen } = useDialog();

  const inputRef = useRef<HTMLInputElement | any>(null);

  const saveQaFile = useSWRMutation(
    "/v1/ticket/file",
    async (url: string, { arg }: { arg: string }) =>
      await Post<CommonResponse<void>>(url, { file: arg, ticketId }),
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
        saveQaFile.trigger(data.Location);
      });
    }
  };

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

export default TicketFileUploader;
