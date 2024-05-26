export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div>{children}</div>;
}
