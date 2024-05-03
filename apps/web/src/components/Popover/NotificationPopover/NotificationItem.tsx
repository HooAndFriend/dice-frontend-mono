// ** Component Imports
import CustomImage from "../../Image/CustomImage";

// ** Utils Imports
import dayjs from "dayjs";

const NotificationItem = () => {
  return (
    <div className="flex mt-4">
      <div className="flex justify-center w-[40px] h-full pt-1">
        <CustomImage
          src="/images/dice.png"
          width={30}
          height={30}
          alt="profile"
          className="rounded-full"
        />
      </div>
      <div className="w-[320px] px-2">
        <p className="text-[12px]">
          Dennis Nedry commented on Isla Nublar SOC2 compliance report{" "}
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          {dayjs().format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
