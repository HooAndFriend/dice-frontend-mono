// ** React Imports
import { useState } from 'react'

// ** Style
import styled from 'styled-components'
import Color from '@/src/constants/color'

const MoveTop = () => {
  return (
    <Section6>
      <ContentWrapper>
        <Text>지금 바로 협업툴 HI-DICE를 무료로 사용해 보세요</Text>
        <DownloadButton>무료로 다운로드</DownloadButton>
      </ContentWrapper>
    </Section6>
  )
}
export default MoveTop

const Section6 = styled.section`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: #623ad6;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid #623ad6;
  margin-top: 20px;
  font-size: 24px;
  &:hover {
    background-color: ${Color.lightGrey};
  }
`

const Text = styled.span`
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 33px;
`
