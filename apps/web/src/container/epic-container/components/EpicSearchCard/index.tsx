"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** Component Imports
import EpicSearchCardView from "./EpicSearchCard";

const EpicSearchCard = () => {
  const pathname = usePathname();

  if (pathname === "/dashboard/epic/setting") return;

  return <EpicSearchCardView />;
};

export default EpicSearchCard;
