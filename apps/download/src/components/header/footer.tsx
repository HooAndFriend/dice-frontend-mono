// ** style
import styled from 'styled-components'

const Footer = () => {
  return (
    <HeaderWrapper>
      <LeftContainer>
        <Logo src="/images/HI-DICE.png" alt="로고" />
      </LeftContainer>
      <RightContainer>
        <CustomerService>ⓒ 2024. Hi-Dice All rights reserved.</CustomerService>
      </RightContainer>
    </HeaderWrapper>
  )
}
export default Footer

const HeaderWrapper = styled.header`
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  color: #fff;
  border-top: 1px solid #d8d8d8;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 80px;
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`

const CustomerService = styled.span`
  margin-right: 10px;
  color: black;
  font-weight: 500;
`
