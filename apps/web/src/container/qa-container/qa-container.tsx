interface PropsType {}

const QaContainerView = ({}: PropsType) => {
  return (
    <div className="p-5">
      <div>
        <h1 className="text-3xl font-bold">QA</h1>
      </div>
      <div className="mt-6 h-[180px] w-full bg-white rounded-3xl shadow-md"></div>
    </div>
  );
};

export default QaContainerView;
