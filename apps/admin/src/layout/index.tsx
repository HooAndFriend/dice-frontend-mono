// ** Component Imports
import HorizontalHeader from './horizontal'

const UseLayout = ({ children }) => {
  return (
    <div className="w-full h-screen overflow-auto bg-[#F6F7FF]">
      <HorizontalHeader />
      {children}
    </div>
  )
}

export default UseLayout
