// ** Recoil Imports
import { useRecoilValue } from "recoil";
import { AuthState, WorkspaceState } from "@/src/app";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetWorkspaceFunctionListResponse } from "@/src/type/workspace";

const WorkspaceAddFunctionContent = () => {
  const { accessToken } = useRecoilValue(AuthState);
  const { uuid, role } = useRecoilValue(WorkspaceState);

  const { data, error, isLoading, mutate } = useSWR(
    "/v1/workspace-function/function",
    async (url) =>
      Get<GetWorkspaceFunctionListResponse>(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "workspace-code": uuid,
        },
      })
  );

  if (isLoading) return;

  return (
    <div>
      <div className="w-full h-[50px] border border-[#EBEBEC] rounded-[10px] flex justify-between">
        <input
          className="ml-[15px] border-none focus:outline-none w-full"
          placeholder="Search"
        />
        <img
          className="mr-[15px]"
          src="/svg/searchIcon.svg"
          width={24}
          height={24}
        />
      </div>
      <div className="w-full mt-[33px]">
        <div className="text-base font-spoqa">Already Have</div>
        <div className="mt-[13px] w-full h-10 flex items-center">
          {data.data.data
            .filter((item) => item.isUse)
            .map((item) => (
              <div
                className="w-[103px] h-10 rounded-[50px] border border-[#EBEBEC] text-base font-spoqa flex items-center pl-[15px] justify-between mr-4"
                key={item.function}
              >
                {item.function}
                {role === "ADMIN" && (
                  <img
                    className="mr-[13px]"
                    src="/svg/trashcanIcon.svg"
                    width={15}
                    height={15}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="w-[750px] mt-[42px]">
        <div className="text-base font-spoqa">More Functions</div>
        <div className="w-[750px] mt-3 ml-[6px] flex">
          {data.data.data
            .filter((item) => !item.isUse)
            .map((item) => (
              <div
                className="border border-[#EBEBEC] w-[360px] h-[76px] rounded-[20px] flex items-center font-spoqa text-base justify-between"
                key={item.function}
              >
                <div className="flex">
                  <img
                    className="ml-[13px] mr-[10px]"
                    src="/svg/note_edit.svg"
                  />
                  {item.function}
                </div>
                {role === "ADMIN" && (
                  <div className="w-[97px] h-9 border border-[#EBEBEC] rounded-[50px] flex items-center font-spoqa font-bold text-base justify-center mr-[18px]">
                    <img
                      className="mr-2"
                      src="/svg/edit_plus.svg"
                      width={24}
                      height={24}
                    />
                    <div className="pt-1">Add</div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceAddFunctionContent;
