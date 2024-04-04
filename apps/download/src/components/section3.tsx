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
        <TextBoxContainer>
          <TextBox>
            <MainText>
              STEP 01.
              <br />팀 구성
            </MainText>
            <TeamList>
              <li>함께 프로젝트를 진행하는 팀원 관리</li>
              <li>워크스페이스별 참여 팀원 분류</li>
            </TeamList>
          </TextBox>
          <TextBox>
            <MainText>
              STEP 02.
              <br />
              To Do 관리
            </MainText>
            <TeamList>
              <li>해야 할 업무에 대한 티켓 발급</li>
              <li>티켓별 담당자 지정</li>
            </TeamList>
          </TextBox>
          <TextBox>
            <MainText>
              STEP 03.
              <br />
              일정 관리
            </MainText>
            <TeamList>
              <li>티켓별 일정 산정</li>
              <li>일정 단위의 스프린트 관리</li>
            </TeamList>
          </TextBox>
          <TextBox>
            <MainText>
              STEP 04.
              <br />
              오류케이스 관리
            </MainText>
            <TeamList>
              <li>함께 프로젝트를 진행하는 팀원 관리</li>
              <li>워크스페이스별 참여 팀원 분류</li>
            </TeamList>
          </TextBox>
        </TextBoxContainer>
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
  margin-top: 15vh;
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

const TextBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-top: 15px;
`

const MainText = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  color: #000;
`

const TeamList = styled.ul`
  font-weight: 500;
  margin-top: 10px;
  margin-left: 20px;
  list-style-type: disc;
`
