"use client";
// ** Next Imports
import { usePathname } from "next/navigation";

// ** Component Imports
import EpicSearchCardView from "./EpicSearchCard";

const EpicSearchCard = () => {
  const pathname = usePathname();

  return <EpicSearchCardView pathname={pathname} />;
};

export default EpicSearchCard;
