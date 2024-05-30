export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <div className="py-[30px] px-[47px] h-full w-[100%]">{children}</div>
    </div>
  );
}
