// ** React Imports
import { useState } from 'react'

// ** Style
import styled from 'styled-components'
import Color from '@/src/constants/color'

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <HeaderWrapper>
      <LeftContainer>
        <Logo src="/images/logo.png" alt="로고" />
      </LeftContainer>
      <RightContainer>
        <CustomerContainer>
          <CustomerService>고객센터</CustomerService>
        </CustomerContainer>
        <DropdownContainer>
          <DownloadButton onClick={() => setShowDropdown(!showDropdown)}>
            무료로 다운로드
            <OpenIcon src="/images/triangle.png" alt="펼치기" />
          </DownloadButton>
          {showDropdown ? (
            <DropdownMenu>
              <DropdownItem>Mac download</DropdownItem>
              <DropdownItem>Window download</DropdownItem>
            </DropdownMenu>
          ) : null}
        </DropdownContainer>
      </RightContainer>
    </HeaderWrapper>
  )
}
export default Header

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: white;
  color: #fff;
  top: 0;
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 100px;
`

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`

const CustomerContainer = styled.div`
  display: flex;
  align-items: center;
`

const CustomerService = styled.span`
  margin-right: 30px;
  color: black;
  font-weight: bold;
`

const DownloadButton = styled.button`
  padding: 10px 20px;
  background-color: #fff;
  color: #623ad6;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #623ad6;

  &:hover {
    background-color: ${Color.lightGrey};
  }
`

const OpenIcon = styled.img`
  width: 20px;
  margin-left: 5px;
  display: inline-block;
`

const DropdownContainer = styled.div`
  position: relative;
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #623ad6;
  border-top: 0px;
  border-radius: 5px;
  z-index: 2;
`

const DropdownItem = styled.div`
  padding: 5px 10px;
  color: black;
  font-weight: bold;
  cursor: pointer;
  align-items: center;
  &:hover {
    background-color: #f5f5f5;
  }
`
