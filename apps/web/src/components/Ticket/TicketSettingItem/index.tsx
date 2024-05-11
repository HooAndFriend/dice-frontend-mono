// ** Component Imports
import { SettingListInfo, TicketSettingType } from "@/src/type/ticket";

// ** Utils Imports
import useInput from "@/src/hooks/useInput";

// ** Component Imports
import CustomInput from "../../Input/CustomInput";
import CustomImage from "../../Image/CustomImage";
import TicketSettingTypeButton from "../TicketSettingTypeButton";

// ** Context Imports
import { useDialog } from "@/src/context/DialogContext";

// ** Service Imports
import useSWRMutation from "swr/mutation";
import { Delete } from "@/src/repository";
import { mutate } from "swr";

// ** Type Imports
import { CommonResponse } from "@/src/type/common";

interface PropsType {
  item: SettingListInfo;
}

const TicketSettingItem = ({ item }: PropsType) => {
  const { data, handleInput, setData } = useInput<SettingListInfo>({
    id: item.id,
    name: item.name,
    type: item.type,
    description: item.description,
    admin: {
      id: item.admin?.id,
    },
    workspace: {
      id: item.workspace?.id,
    },
  });

  const { handleOpen } = useDialog();

  const setType = (type: TicketSettingType) => {
    setData((c) => ({ ...c, type }));
  };

  const deleteSettingType = useSWRMutation(
    `/v1/ticket/setting/${item.id}`,
    async (url: string) => await Delete<CommonResponse<void>>(url),
    {
      onSuccess: () => {
        mutate("/v1/ticket/setting");
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
    <div className="flex items-center justify-between">
      <div className="flex h-[60px] items-center">
        <div className="flex items-center justify-center">
          <TicketSettingTypeButton type={data.type} setType={setType} />
        </div>
        <div className="px-8">
          <CustomInput
            name="name"
            value={data.name}
            onChange={handleInput}
            width="165px"
            height="50px"
            borderRadius="10px"
          />
        </div>
        <div>
          <CustomInput
            name="description"
            value={data.description}
            onChange={handleInput}
            width="600px"
            height="50px"
            borderRadius="10px"
          />
        </div>
      </div>
      <div onClick={() => deleteSettingType.trigger()} className="ml-4">
        <CustomImage
          src={"/svg/boldX.svg"}
          alt="black-box"
          width={36}
          height={36}
        />
      </div>
    </div>
  );
};

export default TicketSettingItem;
