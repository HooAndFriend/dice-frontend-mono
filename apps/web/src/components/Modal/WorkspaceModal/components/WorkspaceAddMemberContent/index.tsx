// ** Service Imports
import { Post } from "@/src/repository";
import useSWRMutation from "swr/mutation";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Type Imports
import { CommonResponse, RoleType } from "@/src/type/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteWorkspaceUserSchema } from "@/src/schema/workspace";
import { useForm } from "react-hook-form";
import { InviteWorksapceUserParam } from "@/src/type/workspace";

interface PropsType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const WorkspaceAddMemberContent = ({ open, setOpen }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteWorksapceUserParam>({
    resolver: zodResolver(inviteWorkspaceUserSchema),
  });

  const { handleOpen } = useDialog();

  const inviteWorkspaceUser = useSWRMutation(
    "/v1/workspace-user",
    async (url: string, { arg }: { arg: InviteWorksapceUserParam }) =>
      await Post<CommonResponse<void>>(url, arg),
    {
      onSuccess: ({ data }) => {
        setOpen(false);
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

  const onSubmit = (data: InviteWorksapceUserParam) => {
    inviteWorkspaceUser.trigger(data);
  };

  return (
    <div
      className={`bg-black bg-opacity-25 w-full h-screen font-spoqa flex justify-center items-center fixed top-0 left-0 z-50 ${
        open ? "" : "hidden"
      }`}
    >
      <div className="w-[617px] h-[171px] rounded-[20px] bg-white px-[34px] mr-[30px]">
        <div className=" h-[22px] w-full text-xl font-bold mt-[30px] flex justify-between">
          Add Member
          <img onClick={() => setOpen(false)} src="/svg/XButton.svg" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full h-[50px] flex mt-[23px]">
            <div className="w-4/5 ">
              <div className="h-full border border-[#EBEBEC] rounded-[10px] px-4 flex items-center justify-between">
                <input
                  className="w-3/4 focus:outline-none"
                  placeholder="Enter Email or nickName"
                  {...register("email", { required: true })}
                />
                <select
                  id="select2"
                  className="w-1/4 text-[#676767] focus:outline-none border-none"
                  style={{ padding: 0 }}
                  {...register("role", { required: true })}
                >
                  <option className="w-full" value={"VIEWER"}>
                    VIEWER
                  </option>
                  <option className="w-full" value={"WRITER"}>
                    WRITEER
                  </option>
                  <option className="w-full" value={"ADMIN"}>
                    ADMIN
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-main w-1/5 ml-[7px] rounded-[10px] text-white font-bold"
            >
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceAddMemberContent;
