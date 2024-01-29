'use client';

import {useState} from 'react';
import Setting from '@/components/usersetting/setting';
import Team from '@/components/usersetting/team';
import Workspace from '@/components/usersetting/workspace';

interface PropsType {}

const UserSettingContainerView = ({}: PropsType) => {
  const [state, setState] = useState('setting');

  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#FAFAFB] ">
      <div className="bg-white w-[1192px] h-[769px] rounded-2xl shadow-md">
        <div className="mt-[45px] ml-[60px] w-[1072px] h-[38px] flex justify-between">
          <div className="font-mosk font-bold text-[32px]">User Setting</div>
          <div>
            <img alt="X" src="/svg/XButton.svg" width={32} height={32} />
          </div>
        </div>
        <div className="flex w-[1072px] h-[601px] ml-[60px] mt-10 justify-between">
          <div className="bg-main w-[274px] h-[601px] rounded-tr-[20px] rounded-b-[20px] flex flex-col items-center">
            <img
              src="/images/dice.png"
              alt="Sample Image"
              className="w-[91px] h-[91px] object-cover rounded-full mt-[52px]"
            />

            <div className="mt-[21px] font-spoqa font-bold text-[25px] text-white">
              DICE
            </div>
            <div className="mt-[57px]">
              <div
                onClick={e => {
                  e.preventDefault();
                  setState('setting');
                }}
                className={`mb-[15px] w-[205px] h-[40px] rounded-full flex items-center text-base font-bold font-spoqa ${
                  state == 'setting'
                    ? 'text-main bg-white'
                    : 'bg-main text-white'
                }`}
              >
                <img
                  className="ml-[18px] mr-5"
                  src={
                    state == 'setting'
                      ? '/svg/setting.svg'
                      : '/svg/settingW.svg'
                  }
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
                className={`mb-[15px] w-[205px] h-[40px] rounded-full flex items-center text-base font-bold font-spoqa ${
                  state == 'team' ? 'text-main bg-white' : 'bg-main text-white'
                }`}
              >
                <img
                  className="ml-[18px] mr-5"
                  src={state == 'team' ? '/svg/team.svg' : '/svg/teamW.svg'}
                  alt="team"
                  width={24}
                  height={24}
                />
                Team
              </div>
              <div
                onClick={e => {
                  e.preventDefault();
                  setState('workspace');
                }}
                className={`w-[205px] h-[40 px] rounded-full flex items-center text-base font-bold font-spoqa ${
                  state == 'workspace'
                    ? 'text-main bg-white'
                    : 'bg-main text-white'
                }`}
              >
                <img
                  className="ml-[18px] mr-5"
                  src={
                    state == 'workspace'
                      ? '/svg/workspace.svg'
                      : '/svg/workspaceW.svg'
                  }
                  alt="workspace"
                  width={24}
                  height={24}
                />
                Workspace
              </div>
            </div>
          </div>
          <div className="w-[742px] h-[601px]">
            {state == 'setting' ? <Setting /> : null}
            {state == 'team' ? <Team /> : null}
            {state == 'workspace' ? <Workspace /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingContainerView;