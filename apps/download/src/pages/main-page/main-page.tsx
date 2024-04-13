// ** style
import styled from 'styled-components'
import Color from '@/src/constants/color'
// ** components
import Header from '@/src/components/header/header'
import Footer from '@/src/components/header/footer'
import MoveTop from '@/src/components/move-top'
import Section1 from '@/src/components/section1'
import Section2 from '@/src/components/section2'
import Section3 from '@/src/components/section3'
import Section4 from '@/src/components/section4'
const MainPageView = () => {
  return (
    <div>
      <Header />
      <Background>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Blank />
        <MoveTop />
        <Footer />
      </Background>
    </div>
  )
}

export default MainPageView

const Background = styled.div`
  width: 100%;
  height: 3771px;
  background-color: #fafafb;
  display: grid;
  grid-template-rows: 740px 970px 631px 1077px 20px 250px 83px;
  grid-template-columns: 100%;
`

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Blank = styled(Section)`
  background-color: #fafafb;
`
