// ** Next Imports
import Image from "next/image";

interface PropsType {
  width?: string;
  height?: string;
  color: string;
  icon: string;
  title: string;
  text: string;
  value: number;
}

const DashboardCard = ({
  width,
  height,
  color,
  icon,
  title,
  text,
  value,
}: PropsType) => {
  return (
    <div
      className={`mt-6 h-[${height ? height : "215px"}] w-[${
        width ? width : "380px"
      }] bg-white rounded-[20px] shadow-md py-4 px-8`}
    >
      <div
        className={`w-[60px] h-[60px] bg-[${color}] rounded-full flex justify-center items-center`}
      >
        <Image src={icon} alt="title" width={30} height={30} />
      </div>
      <div className="mt-6">
        <h1 className="text-[32px] font-bold">{text}</h1>
      </div>
      <div className="flex items-center justify-between mt-6">
        <p className="text-[#676767]">{title}</p>
        {value === 0 ? (
          <div className="flex">
            <p className={`text-[${value >= 0 ? "#FF553E" : "#22B863"}] -mr-2`}>
              0%
            </p>
          </div>
        ) : (
          <div className="flex">
            <Image
              src={`${
                value >= 0 ? "/svg/dashboard-up.svg" : "/svg/dashboard-down.svg"
              }`}
              width={20}
              height={20}
              alt="up"
              className="mr-2"
            />
            <p className={`text-[${value >= 0 ? "#FF553E" : "#22B863"}] -mr-2`}>
              {value >= 0 ? `+ ${value}%` : `- ${value * -1}%`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
