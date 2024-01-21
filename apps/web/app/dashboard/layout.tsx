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
          <img
            src="/images/profile.jpg"
            width="30px"
            height="30px"
            alt="profile"
            className="rounded-full border-2 border-[#EBEBEC] mr-[10px]"
          />
          <h2>김인후</h2>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="w-[200px] border-r-2 border-[#EBEBEC] flex justify-center">
          <div>
            <div>
              <h1>Dashboard</h1>
            </div>
            <div>
              <h1>Ticket</h1>
            </div>
            <div>
              <h1>QA</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#FAFAFB]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardRayout;
