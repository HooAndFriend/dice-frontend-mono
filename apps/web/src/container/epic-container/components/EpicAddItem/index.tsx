"use client";
// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import CustomInput from "@/src/components/Input/CustomInput";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

const EpicAddItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const { handleOpen: handleModalOpen } = useDialog();

  const handleOpen = () => setOpen((c) => !c);

  const saveEpic = useSWRMutation(
    "/v1/epic",
    async (url: string) => await Post<CommonResponse<void>>(url, { name }),
    {
      onSuccess: () => {
        setOpen(false);
        setName("");
      },
      onError: (error) => {
        handleModalOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
      },
    }
  );

  return (
    <div className="w-full h-[75px] flex items-center">
      {open ? (
        <>
          <div className="mr-8 w-[24px] h-[24px] bg-green-300 rounded-lg" />
          <CustomInput
            placeholder="Enter Epic Name"
            borderRadius="8px"
            height="36px"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="ml-4 cursor-pointer" onClick={saveEpic.trigger}>
            <Image
              src={"/svg/add-black-box.svg"}
              alt="black-box"
              width={36}
              height={36}
            />
          </div>
        </>
      ) : (
        <div onClick={handleOpen} className="flex items-center w-full h-full">
          <Image src="/svg/add-box.svg" width={36} height={36} alt="add-box" />
          <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
            Add Epic
          </h1>
        </div>
      )}
    </div>
  );
};

export default EpicAddItem;
