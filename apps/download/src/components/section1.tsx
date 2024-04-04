// ** React Imports
import { useState } from 'react'

// ** Style
import styled from 'styled-components'
import Color from '@/src/constants/color'

const Section1 = () => {
  return (
    <Container>
      <ContentWrapper>
        <Text>
          맞춤형 협업툴 HI-DICE로 <br />
          프로젝트를 관리해 보세요
        </Text>
        <DownloadButton>프로젝트 관리하러 가기</DownloadButton>
      </ContentWrapper>
      <div>
        <OverlayImage src="/images/group.png" alt="로고" />
      </div>
    </Container>
  )
}
export default Section1

const Container = styled.section`
  background-color: #fafafb;
  display: flex;
  padding: 60px;
  justify-content: center;
  position: relative;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`

const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: #623ad6;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #623ad6;
  margin-top: 50px;
  font-size: 24px;

  &:hover {
    background-color: ${Color.lightGrey};
  }
`

const Text = styled.span`
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 66px;
`

const OverlayImage = styled.img`
  position: absolute;
  top: 100%;
  left: 55%;
  transform: translate(-50%, -60%);
  width: 70%;
  max-width: 1280px;
  max-height: 640px;
  z-index: 1;
`

const MascotImage = styled.img`
  position: absolute;
  top: 50%;
  left: 75%;
  max-width: 25%;
  max-height: 25%;
  width: auto;
  height: auto;
  z-index: 2;
`
