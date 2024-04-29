"use client";

// ** React Imports
import { Fragment, KeyboardEvent, useState } from "react";

// ** ui Imports
import { Dialog, Transition } from "@headlessui/react";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { SaveQaParam } from "@/src/type/qa";
import { CommonResponse } from "@/src/type/common";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

interface PropsType {
  open: boolean;
  parentId?: number;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

const BoardSaveModal = ({
  open,
  parentId,
  setOpen,
  cancelButtonRef,
  refetch,
}: PropsType) => {
  const [button, setButton] = useState<boolean>(false);

  const { data, handleInput, handleInit } = useInput<SaveQaParam>({
    title: "",
  });

  const { handleOpen } = useDialog();

  const saveQa = useSWRMutation(
    "/v1/board",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, { ...data, parentId }),
    {
      onSuccess: ({ data }) => {
        setOpen(false);
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
        setButton(false);
      },
    }
  );

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (button) return;
      setButton(true);
      saveQa.trigger();
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl">
                <div className="p-5 w-[500px] h-[200px]bg-[#FAFAFB] ">
                  <div className="flex justify-between">
                    <h1 className="font-bold text-[24px]">Save Board</h1>
                    <h1
                      className="font-bold text-[24px] cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </h1>
                  </div>
                  <div className="flex items-center w-full mt-5">
                    <h1 className="w-1/5 mr-5">Board Name</h1>
                    <input
                      type="text"
                      value={data.title}
                      name="title"
                      onChange={handleInput}
                      onKeyDown={handleEnter}
                      className="w-[400px] h-[40px] border-solid border-1 border-[#EFEFEF] rounded-[8px] pl-4 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      className="bg-[#623AD6] w-[72px] h-[32px] rounded-md text-white"
                      onClick={saveQa.trigger}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BoardSaveModal;
