"use client";

// ** Component Imports
import EpicContainerView from "./epic-container";

// ** Service Imports
import useSWR from "swr";
import { Get } from "@/src/repository";

// ** Type Imports
import { GetEpicListResponse } from "@/src/type/epic";
import { useState } from "react";

const EpicConatiner = () => {
  const [word, setWord] = useState<string>("");

  const { data, error, isLoading } = useSWR("/v1/epic", async (url) =>
    Get<GetEpicListResponse>(url)
  );

  if (isLoading) return;

  if (error) return;

  return (
    <EpicContainerView
      epicData={data.data.data}
      epicCount={data.data.count}
      word={word}
      handleWord={(e) => setWord(e.target.value)}
    />
  );
};

export default EpicConatiner;
