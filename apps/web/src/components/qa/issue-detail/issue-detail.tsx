const IssueDetailView = () => {
  return (
    <div className="w-1/2 h-[564px] rounded-[20px] bg-white shadow-md border-[#EBEBEC] p-6 overflow-auto">
      <div className="h-[40px] flex items-center justify-between">
        <div>ISSUE-101</div>
        <div className="flex">
          <button>
            <img src="" />
            Edit
          </button>
          <button>
            <img src="" />
            Delete
          </button>
        </div>
      </div>
      <div className="h-[50px] flex justify-between">
        <div>상세보기 버튼 누락</div>
        <select>
          <option>Wait</option>
        </select>
      </div>
    </div>
  );
};

export default IssueDetailView;
