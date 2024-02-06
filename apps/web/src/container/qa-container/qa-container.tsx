const QaContainerView = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[70px] flex justify-between items-centers">
        <div className="ml-7 flex items-center">
          <img
            className="mr-1 w-[25px] h-[25px]"
            src="favicon.ico"
            width={30}
            height={30}
          />
          <div className="text-main font-mosk font-bold text-2xl">HIDICE</div>
        </div>
        <div className="mr-7 flex items-center">
          <img
            className="rounded-full border border-[#EBEBEC] w-[30px] h-[30px] mr-2"
            src="images/dice.png"
            width={30}
            height={30}
          />
          <div className="font-mosk text-base font-bold flex items-center">
            홍길동
          </div>
        </div>
      </div>
      <div className="flex w-full h-full">
        <div className="w-[70px] h-full border-t border-[#EBEBEC] flex flex-col items-center justify-between">
          <div className="">
            <div className="w-[40px] h-[40px] rounded-[10px] bg-white flex justify-center items-center mt-[38px]">
              <img src="images/House_02.png" width={24} height={24} />
            </div>
            <div className="w-[40px] h-[40px] rounded-[10px] bg-white flex justify-center items-center mt-[15px]">
              <img src="images/File_02.png" width={24} height={24} />
            </div>
            <div className="w-[40px] h-[40px] rounded-[10px] bg-main flex justify-center items-center mt-[15px]">
              <img src="images/Note_Edit.png" width={24} height={24} />
            </div>
          </div>
          <div className="w-[87px] h-[30px] flex  mt-[770px]">
            <div>
              <img
                className="rounded-full border border-[#EBEBEC] ml-6"
                src="images/dice.png"
                width={30}
                height={30}
              />
            </div>
            <div className="bg-[#F4F4FA] w-[30px] h-[30px] rounded-[7px] flex justify-center items-center ml-[5px] relative left-[5px]">
              <img src="images/Chevron_Right_MD.png" width={24} height={24} />
            </div>
          </div>
        </div>
        <div className="w-full h-full border-t border-[#EBEBEC] bg-[#FAFAFB] border-x">
          {/* 오른쪽 내용 */}
          <div className="ml-[47px] mt-[30px] w-[95%] h-full ">
            <div className="font-mosk font-bold text-[32px]">QA</div>
            <div className="w-full h-[100px] shadow-md border-[#EBEBEC] rounded-[20px] bg-white mt-[30px] flex items-center">
              <div className="font-spoqa text-base font-bold ml-[25px] mr-[33px] text-center">
                Title
              </div>
              <select className="w-[165px] h-[50px] border border-[#EBEBEC] rounded-[10px] text-[#EBEBEC] pl-4">
                <option>Title</option>
              </select>
              <div className="font-spoqa text-base font-bold ml-[50px] mr-[29px] text-center">
                Search
              </div>
              <div className="w-[443px] h-[50px] rounded-[10px] border border-[#EBEBEC] pl-4 flex items-center justify-between pr-4">
                <input
                  className="h-[45px] placeholder-[#EBEBEC] focus:outline-none"
                  placeholder="Search"
                />
                <img src="svg/searchIcon.svg" width={24} height={24} />
              </div>
            </div>
            <div className="h-[50px] w-full flex justify-between items-center mt-[43px] mb-[30px]">
              <div className="text-center font-spoqa text-lg font-medium">
                Total 4건
              </div>
              <div className="flex items-center">
                <div className="flex items-center h-6 w-[406px] justify-between font-spoqa text-[#EBEBEC]">
                  <div className="text-main border-b border-main">ALL</div>
                  <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
                  <div>WAITING</div>
                  <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
                  <div>DOING</div>
                  <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
                  <div>DONE</div>
                  <div className="h-[15px] w-px bg-[#EBEBEC]"></div>
                  <div>COMPLETE</div>
                </div>
                <div className="w-[120px] h-[50px] rounded-[30px] flex items-center bg-white border border-[#EBEBEC] justify-center ml-8">
                  <img src="images/Add_To_Queue.png" width={24} height={24} />
                  <div className="font-spoqa font-bold text-center ml-[5px]">
                    Add
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[521px] flex justify-between mb-[168px]">
              <div className="w-1/2 h-[521px] rounded-[20px] bg-white mr-10 shadow-md border-[#EBEBEC]">
                <div className="h-[125px] m-6">
                  <div className="w-full h-[30px] flex mb-[5px]">
                    <div className="flex items-center mr-5">ISSLE-01</div>
                    <div className="bg-[#F13333] w-[67px] h-[30px] rounded-[10px] text-white flex items-center justify-center font-spoqa text-base text-center">
                      NEW
                    </div>
                  </div>
                  <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
                    [AOS] 상세보기 버튼 누락
                  </div>
                  <div className="w-full h-[45px] flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        className="rounded-full border border-[#EBEBEC] mr-[10px] "
                        src="images/dice.png"
                        width={30}
                        height={30}
                      />
                      <div className="font-spoqa">김인후</div>
                    </div>
                    <button className="w-[120px] h-[45px] rounded-[30px] bg-main flex justify-center items-center text-white font-spoqa font-bold ">
                      WAITING
                    </button>
                  </div>
                </div>
                <div className="h-[1px] bg-[#EBEBEC] mx-6"></div>
                <div className="h-[125px] m-6">
                  <div className="w-full h-[30px] flex mb-[5px]">
                    <div className="flex items-center mr-5">ISSLE-01</div>
                  </div>
                  <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
                    [AOS] 상세보기 버튼 누락
                  </div>
                  <div className="w-full h-[45px] flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        className="rounded-full border border-[#EBEBEC] mr-[10px] "
                        src="images/dice.png"
                        width={30}
                        height={30}
                      />
                      <div className="font-spoqa">김인후</div>
                    </div>
                    <button className="w-[120px] h-[45px] rounded-[30px] bg-main flex justify-center items-center text-white font-spoqa font-bold ">
                      WAITING
                    </button>
                  </div>
                </div>
                <div className="h-[1px] bg-[#EBEBEC] mx-6"></div>
                <div className="h-[125px] m-6">
                  <div className="w-full h-[30px] flex mb-[5px]">
                    <div className="flex items-center mr-5">ISSLE-01</div>
                  </div>
                  <div className="w-full h-[30px] font-spoqa font-medium text-lg mb-[15px]">
                    [AOS] 상세보기 버튼 누락
                  </div>
                  <div className="w-full h-[45px] flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        className="rounded-full border border-[#EBEBEC] mr-[10px] "
                        src="images/dice.png"
                        width={30}
                        height={30}
                      />
                      <div className="font-spoqa">김인후</div>
                    </div>
                    <button className="w-[120px] h-[45px] rounded-[30px] bg-main flex justify-center items-center text-white font-spoqa font-bold ">
                      WAITING
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-[521px] rounded-[20px] bg-white shadow-md border-[#EBEBEC]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QaContainerView;
