// ** Next Imports
import Link from "next/link";

interface PropsType {
  icon: React.FC<{ className: string }>;
  isClicked: boolean;
  name: string;
  link: string;
}

const TicketMenuItem = ({ link, icon: Icon, isClicked, name }: PropsType) => {
  return (
    <Link href={link} className="flex items-center justify-center mt-4">
      <div
        className={`flex items-center justify-center rounded-[10px] w-[90%] h-[40px] py-3 ${
          isClicked ? "bg-[#623AD6]" : ""
        }`}
      >
        <div className="w-[30%]">
          <div className="pl-4 rounded-lg w-[40px] h-[40px] flex justify-center items-center">
            <Icon className="" />
          </div>
        </div>
        <div className="w-[70%]">
          <h1>{name}</h1>
        </div>
      </div>
    </Link>
  );
};

export default TicketMenuItem;
