"use client";

const BoardSidebar = () => {
  return (
    <div className="w-[200px] bg-white border-r-2 border-[#EBEBEC] px-4 py-2">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[14px] font-bold">Content</h1>
        <button className="w-[20px] font-bold text-[16px] h-[20px]">+</button>
      </div>
      <div className="mt-4">
        {data.map((item) =>
          item.children.length > 0 ? (
            <div key={item.id}>
              <div className="flex items-center mb-2" key={item.id}>
                <div className="w-[5px] h-[5px] rounded-full bg-black mr-4" />
                <p>{item.name}</p>
              </div>
              {item.children.map((_) => (
                <div className="flex items-center mb-2 ml-4" key={_.id}>
                  <div className="w-[5px] h-[5px] rounded-full bg-black mr-4" />
                  <p>{_.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center mb-2" key={item.id}>
              <div className="w-[5px] h-[5px] rounded-full bg-black mr-4" />
              <p>{item.name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BoardSidebar;

const data = [
  {
    id: 1,
    name: "기능 명세서",
    children: [],
  },
  {
    id: 2,
    name: "WBS",
    children: [],
  },
  {
    id: 3,
    name: "IA",
    children: [],
  },
  {
    id: 4,
    name: "회의록",
    children: [
      {
        id: 1,
        name: "2024-04-01",
        children: [],
      },
      {
        id: 2,
        name: "2024-04-04",
        children: [],
      },
      {
        id: 3,
        name: "2024-04-05",
        children: [],
      },
    ],
  },
];
