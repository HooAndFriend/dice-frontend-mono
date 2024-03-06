"use client";

import {useRecoilValue} from "recoil";
import CreateIssueView from "./create-issue";
import {AuthState, UserState} from "@/src/app";
import useInput from "@/src/hooks/useInput";
import {CreateIssueParams, CreateIssueResponse} from "@/src/type/qa";
import {useDialog} from "@/src/context/DialogContext";
import useSWRMutation from "swr/mutation";
import {Post} from "@/src/repository";
import {useState} from "react";
import {storage} from "@/src/config/firebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

interface PropsType {}

const CreateIssue = ({}: PropsType) => {
  const {email, nickname} = useRecoilValue(UserState);
  const {accessToken} = useRecoilValue(AuthState);
  const {
    data: createIssue,
    handleInput,
    setData,
  } = useInput<CreateIssueParams>({
    adminId: email,
    workerId: email,
    number: "ISSUE-01", // 임시로 1번으로 지정
    title: "",
    asIs: "",
    toBe: "",
    memo: "",
    fileurls: [
      {
        url: "",
      },
    ],
  });

  const {handleOpen} = useDialog();

  const handleUpload = (fileUrl: File) => {
    const timestamp = new Date();
    const imageRef = ref(storage, `images/issue_${timestamp.getTime()}`);
    uploadBytes(imageRef, fileUrl).then(snapshot => {
      getDownloadURL(snapshot.ref).then(downUrl => {
        createIssue.fileurls[0].url = downUrl;
      });
    });
  };

  const handleAdd = () => {
    console.log(createIssue);
    if (createIssue.title === "") {
      handleOpen({
        title: "Error",
        message: "Enter title",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

      return;
    }

    if (createIssue.asIs === "") {
      handleOpen({
        title: "Error",
        message: "Enter AsIs",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

      return;
    }

    if (createIssue.toBe === "") {
      handleOpen({
        title: "Error",
        message: "Enter ToBe",
        logLevel: "warn",
        buttonText: "Close",
        type: "alert",
      });

      return;
    }

    console.log(createIssue);
    console.log(accessToken);
    addIssue.trigger();
  };

  const addIssue = useSWRMutation(
    "/v1/qa",
    async (url: string) =>
      await Post<CreateIssueResponse>(
        url,
        {
          ...createIssue,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ),
    {
      onSuccess: () => {
        alert("등록이 완료되었습니다");
      },
      onError: error => {
        console.log(error + "등록 실패");
      },
    }
  );

  return (
    <CreateIssueView
      createIssue={createIssue}
      handleInput={handleInput}
      handleAdd={handleAdd}
      handleUpload={handleUpload}
      name={nickname}
    />
  );
};

export default CreateIssue;
