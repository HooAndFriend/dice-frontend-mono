"use client";

// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useState } from "react";

// ** Component Imports
import CustomInput from "@/src/components/Input/CustomInput";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";
import { mutate } from "swr";

const TicketAddItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleModalOpen } = useDialog();

  const saveTicket = useSWRMutation(
    "/v1/ticket/simple",
    async (url: string) => await Post<CommonResponse<void>>(url, { name }),
    {
      onSuccess: () => {
        setOpen(false);
        setName("");
        mutate("/v1/ticket");
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
    <div className="pl-8 w-full h-[75px] flex items-center">
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
          <div className="ml-4" onClick={saveTicket.trigger}>
            <Image
              onClick={handleOpen}
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
            Add Ticket
          </h1>
        </div>
      )}
    </div>
  );
};

export default TicketAddItem;
