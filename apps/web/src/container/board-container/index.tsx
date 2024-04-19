"use client";
// ** React Imports
import { useState } from "react";

// ** Component Imports
import BoardContainerView from "./board-container";

// ** Type Imports
import { OutputData } from "@editorjs/editorjs";

const BoardContainer = () => {
  const [content, setContent] = useState<OutputData>();
  const [readOnly, setReadOnly] = useState<boolean>(true);

  const handleSave = () => {
    setReadOnly(true);
    console.log("CONTENT : ", content);
  };

  return (
    <BoardContainerView
      content={content}
      readOnly={readOnly}
      setReadOnly={setReadOnly}
      setContent={setContent}
      handleSave={handleSave}
    />
  );
};

export default BoardContainer;
