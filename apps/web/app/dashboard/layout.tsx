import MenuItem from "@/components/menu-item";
import ProfileBox from "@/components/profile-box";
import { MenuList } from "@/constants";

const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 border-b-2 border-[#EBEBEC] flex items-center justify-between">
        <img
          src="/images/logo.png"
          width="110px"
          height="30px"
          alt="logo"
          className="ml-[30px]"
        />
        <div className="flex items-center mr-[30px]">
          <ProfileBox image="/images/profile.jpg" alt="profile" />
          <h2>김인후</h2>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-[70px] border-r-2 border-[#EBEBEC]">
          <div className="flex justify-center h-4/5">
            <div>
              {MenuList.map((item) => (
                <MenuItem key={item.id} image={item.image} alt={item.image} />
              ))}
            </div>
          </div>
          <div className="flex h-1/5">
            <div className="flex flex-grow items-end justify-center pb-3">
              <ProfileBox image="/images/profile.jpg" alt="profile" />
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#FAFAFB]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardRayout;
