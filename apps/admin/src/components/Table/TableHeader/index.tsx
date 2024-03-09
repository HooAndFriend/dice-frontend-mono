const TableHeader = () => {
  return (
    <div className="w-full bg-[#F6F6F6] flex items-center h-[45px] rounded-tl-log rounded-tr-lg">
      <div className="pl-4 w-[5%]">번호</div>
      <div className="pl-4 w-[15%]">닉네임</div>
      <div className="pl-4 w-[25%]">이메일</div>
      <div className="pl-4 w-[5%]">가입 구분</div>
      <div className="pl-4 w-[15%]">가입일</div>
      <div className="pl-4 w-[15%]">최근 로그인</div>
      <div className="pl-4 w-[10%]">소속 팀 수</div>
      <div className="pl-4 w-[10%]">소속 워크스페이수 수</div>
    </div>
  )
}

export default TableHeader
