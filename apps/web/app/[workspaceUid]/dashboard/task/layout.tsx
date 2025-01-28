export default function Layout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <div className="flex w-full h-full">
      <div className="px-[47px] h-full w-full">{children}</div>
    </div>
  )
}
