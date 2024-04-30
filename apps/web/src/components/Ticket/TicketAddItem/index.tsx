"use client";

// ** Next Imports
import Image from "next/image";

// ** React Imports
import { KeyboardEvent, useState } from "react";

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
import CustomImage from "../../Image/CustomImage";

interface PropsType {
  epicId?: number;
}

const TicketAddItem = ({ epicId }: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [button, setButton] = useState<boolean>(false);

  const handleOpen = () => setOpen((c) => !c);

  const { handleOpen: handleModalOpen } = useDialog();

  const saveSimpleTicket = useSWRMutation(
    "/v1/ticket/simple",
    async (url: string) => await Post<CommonResponse<void>>(url, { name }),
    {
      onSuccess: () => {
        setButton(false);
        setOpen(false);
        setName("");
        mutate("/v1/ticket");
        mutate("/v1/epic");
      },
      onError: (error) => {
        handleModalOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
        setButton(false);
      },
    }
  );

  const saveTicketWithEpic = useSWRMutation(
    "/v1/ticket",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, { name, epicId }),
    {
      onSuccess: () => {
        setButton(false);
        setOpen(false);
        setName("");
        mutate("/v1/ticket");
        mutate("/v1/epic");
      },
      onError: (error) => {
        handleModalOpen({
          title: "Error",
          message: error.response.data.message,
          logLevel: "warn",
          buttonText: "Close",
          type: "alert",
        });
        setButton(false);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
    setName("");
    setButton(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (button) return;
      setButton(true);
      if (epicId) {
        saveTicketWithEpic.trigger();

        return;
      }

      saveSimpleTicket.trigger();
    }

    if (e.key === "Escape") {
      handleClose();
    }
  };

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
            onKeyDown={handleEnter}
          />
          <div
            className="ml-4"
            onClick={
              epicId ? saveTicketWithEpic.trigger : saveSimpleTicket.trigger
            }
          >
            <CustomImage
              onClick={handleOpen}
              src={"/svg/add-black-box.svg"}
              alt="black-box"
              width={36}
              height={36}
            />
          </div>
          <div className="ml-4 cursor-pointer" onClick={handleClose}>
            <h1 className="font-bold text-[24px]">X</h1>
          </div>
        </>
      ) : (
        <div onClick={handleOpen} className="flex items-center w-full h-full">
          <CustomImage
            src="/svg/add-box.svg"
            width={36}
            height={36}
            alt="add-box"
          />
          <h1 className="text-[#DDDDDD] text-[16px] font-bold ml-4">
            Add Ticket
          </h1>
        </div>
      )}
    </div>
  );
};

export default TicketAddItem;
