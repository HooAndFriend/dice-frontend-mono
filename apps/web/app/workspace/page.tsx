'use client';

import Image from 'next/image';
import {useState} from 'react';
import Setting from './setting';

export default function WorkspaceSetting(): JSX.Element {
  const [state, setState] = useState('setting');

  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[1192px] h-[769px] rounded-2xl shadow-md">
        <div className="mt-[45px] ml-[60px] w-[1072px] h-[38px] flex justify-between">
          <div className="font-mosk font-bold text-[32px]">
            Workspace Setting
          </div>
          <div>
            <Image alt="X" src="/XButton.svg" width={32} height={32} />
          </div>
        </div>
        <div className="flex w-[1072px] h-[601px] ml-[60px] mt-[41px] justify-between">
          <div className="bg-main w-[274px] h-[601px] rounded-tr-[20px] rounded-b-[20px] flex flex-col items-center">
            <img
              src="/dice.png"
              alt="Sample Image"
              className="w-[91px] h-[91px] object-cover rounded-full mt-[50px]"
            />

            <div className="mt-[21px] font-spoqa font-bold text-[25px] text-white">
              DICE
            </div>
            <div className="w-[187px] h-[29.926px] mt-[60px] flex relative">
              <img
                src="/dice.png"
                alt="Sample Image"
                className="w-[29.204px] h-[29.926px] rounded-full"
              />
              <img
                src="/dice.png"
                alt="Sample Image"
                className="w-[29.204px] h-[29.926px] rounded-full absolute left-[24.21px]"
              />
              <img
                src="/dice.png"
                alt="Sample Image"
                className="w-[29.204px] h-[29.926px] rounded-full absolute left-[48.41px]"
              />
              <img
                src="/dot.svg"
                alt="Sample Image"
                className="bg-white w-[29.204px] h-[29.926px] rounded-full absolute left-[72.62px]"
              />
            </div>
            <div className="mt-[35.07px]">
              <div
                onClick={e => {
                  e.preventDefault();
                  setState('setting');
                }}
                className={`mb-[15px] w-[217px] h-[49px] rounded-full flex items-center text-xl font-bold font-spoqa ${
                  state == 'setting'
                    ? 'text-main bg-white'
                    : 'bg-main text-white'
                }`}
              >
                <Image
                  className="ml-[18px] mr-5"
                  src={state == 'setting' ? '/setting.svg' : 'settingW.svg'}
                  alt="setting"
                  width={24}
                  height={24}
                />
                Setting
              </div>
              <div
                onClick={e => {
                  e.preventDefault();
                  setState('team');
                }}
                className={`mb-[15px] w-[217px] h-[49px] rounded-full flex items-center text-xl font-bold font-spoqa ${
                  state == 'team' ? 'text-main bg-white' : 'bg-main text-white'
                }`}
              >
                <Image
                  className="ml-[18px] mr-5"
                  src={state == 'team' ? '/team.svg' : 'teamW.svg'}
                  alt="team"
                  width={24}
                  height={24}
                />
                Member
              </div>
              <div
                onClick={e => {
                  e.preventDefault();
                  setState('workspace');
                }}
                className={`w-[217px] h-[49px] rounded-full flex items-center text-xl font-bold font-spoqa ${
                  state == 'workspace'
                    ? 'text-main bg-white'
                    : 'bg-main text-white'
                }`}
              >
                <Image
                  className="ml-[18px] mr-5"
                  src={
                    state == 'workspace' ? '/workspace.svg' : 'workspaceW.svg'
                  }
                  alt="workspace"
                  width={24}
                  height={24}
                />
                AddFunctions
              </div>
            </div>
          </div>
          <div className="w-[742px] h-[601px]">
            {state == 'setting' ? <Setting /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
