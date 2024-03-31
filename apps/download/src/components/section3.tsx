import React from 'react'
import styled from 'styled-components'

const Section3 = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>
          HI-DICE는 프로젝트에서 발생하는 모든 플로우를
          <TextHighlight> 체크</TextHighlight>합니다.
        </Text>
      </TextWrapper>
      <TimeLineWrapper>
        <TimeLine src="/images/timeline.png" alt="타임라인" />
      </TimeLineWrapper>
    </Container>
  )
}

export default Section3

const Container = styled.section`
  background-color: #fafafb;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextWrapper = styled.div`
  width: 90%;
  margin-bottom: 20px;
  margin-top: 10%;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 40px;
  text-align: center;
`

const TextHighlight = styled.span`
  font-weight: bold;
`

const TimeLineWrapper = styled.div`
  width: 90%;
  margin-top: 5%;
`

const TimeLine = styled.img`
  width: 100%;
`
