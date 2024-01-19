export default function Workspace() {
  return (
    <>
      <div className="h-[39px] w-[735px] flex relative">
        <div className="w-[130px] h-[39px] bg-[#DDDDDD] rounded-t-[10px] absolute  text-white text-base font-bold font-spoqa flex justify-center items-center">
          Team List
        </div>
        <div className="w-[130px] h-[38px] bg-[#EBEBEC] rounded-t-[10px] absolute top-px left-[112px] text-base font-bold font-spoqa flex justify-center items-center">
          workspace
        </div>
      </div>
      <div className="w-full h-[562px] bg-[#EBEBEC] rounded-b-[10px] rounded-tr-[10px] flex flex-col items-center">
        <div className="mt-[31px]">
          <div className="w-[653px] h-[65px] bg-white rounded-[20px] flex items-center justify-between mb-3">
            <div className="flex">
              <img
                alt="Sample Image"
                src="/dice.png"
                className="w-8 h-8 rounded-[10px] ml-[17px] mr-[18px]"
              />
              <div className="w-[335px] text-base font-spoqa flex items-center">
                [Dice] Dice-DC
              </div>
            </div>
            <div className="text-base font-spoqa flex items-center mr-9">
              Admin
            </div>
          </div>
          <div className="w-[653px] h-[65px] bg-white rounded-[20px] flex items-center justify-between mb-3">
            <div className="flex">
              <img
                alt="Sample Image"
                src="/dice.png"
                className="w-8 h-8 rounded-[10px] ml-[17px] mr-[18px]"
              />
              <div className="w-[335px] text-base font-spoqa flex items-center">
                [Dice] Dice-DC
              </div>
            </div>
            <div className="text-base font-spoqa flex items-center mr-9">
              Admin
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
