const DashboardRayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div className="flex flex-col w-full h-screen">{children}</div>;
};

export default DashboardRayout;
