"use client";

// ** React Imports
import { Fragment } from "react";

// ** ui Imports
import { Dialog, Transition } from "@headlessui/react";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Type Imports
import { SaveQaParam } from "@/src/type/qa";

// ** Component Imports
import CustomInput from "../../Input/CustomInput";
import useSWRMutation from "swr/mutation";
import { Post } from "@/src/repository";
import { CommonResponse } from "@/src/type/common";
import { useDialog } from "@/src/context/DialogContext";
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

interface PropsType {
  open: boolean;
  cancelButtonRef: any;
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

const QaSaveModal = ({
  open,
  setOpen,
  cancelButtonRef,
  refetch,
}: PropsType) => {
  const { data, handleInput, handleInit } = useInput<SaveQaParam>({
    title: "",
    number: "",
  });

  const { accessToken } = useRecoilValue(AuthState);
  const { uuid } = useRecoilValue(WorkspaceState);

  const { handleOpen } = useDialog();

  const saveQa = useSWRMutation(
    "/v1/qa/simple",
    async (url: string) =>
      await Post<CommonResponse<void>>(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "workspace-code": `${uuid}`,
        },
      }),
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
      },
    }
  );

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
                    <h1 className="font-bold text-[24px]">Save QA</h1>
                    <h1
                      className="font-bold text-[24px] cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </h1>
                  </div>
                  <div className="flex w-full mt-5">
                    <h1 className="w-1/5 mr-5">Qa Name</h1>
                    <CustomInput
                      value={data.title}
                      name="title"
                      onChange={handleInput}
                    />
                  </div>
                  <div className="flex w-full mt-5">
                    <h1 className="w-1/5 mr-5">Qa Number</h1>
                    <CustomInput
                      value={data.number}
                      name="number"
                      onChange={handleInput}
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

export default QaSaveModal;
