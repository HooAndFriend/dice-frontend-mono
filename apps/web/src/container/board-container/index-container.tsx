interface PropsType {}

const IndexContainerView = ({}: PropsType) => {
  return (
    <div className="w-full h-full p-4 bg-white">
      <div className="flex items-center justify-center h-full text-2xl text-gray-500">
        Select a post to view
      </div>
    </div>
  )
}

export default IndexContainerView
