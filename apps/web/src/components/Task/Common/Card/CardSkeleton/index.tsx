const CardSkeleton = () => {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="w-full h-16 bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
