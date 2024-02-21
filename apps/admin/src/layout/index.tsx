// ** Component Imports
import HorizontalHeader from './horizontal'

const UseLayout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-[#F6F7FF]">
      <HorizontalHeader />
      {children}
    </div>
  )
}

export default UseLayout
