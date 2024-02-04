// ** Next Imports
import Link from "next/link";

interface PropsType {
  icon: React.FC<{ className: string }>;
  isClicked: boolean;
  link: string;
}

const MenuItem = ({ link, icon: Icon, isClicked }: PropsType) => {
  return (
    <Link href={link}>
      <div className="py-3">
        <div
          className={`${
            isClicked ? "bg-[#623AD6]" : ""
          } rounded-lg w-[40px] h-[40px] flex justify-center items-center`}
        >
          <Icon className="" />
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
