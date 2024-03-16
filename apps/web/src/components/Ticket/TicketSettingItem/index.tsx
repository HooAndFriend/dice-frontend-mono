// ** Component Imports
import CustomInput from "../../Input/CustomInput";

interface PropsType {}

const TicketSettingItem = ({}: PropsType) => {
  return (
    <div className="flex h-[60px] items-center">
      <div className="flex items-center justify-center">
        <div className="w-[40px] h-[40px] bg-green-300 rounded-lg" />
      </div>
      <div className="px-8">
        <CustomInput width="165px" height="50px" borderRadius="10px" />
      </div>
      <div>
        <CustomInput width="1000px" height="50px" borderRadius="10px" />
      </div>
    </div>
  );
};

export default TicketSettingItem;
