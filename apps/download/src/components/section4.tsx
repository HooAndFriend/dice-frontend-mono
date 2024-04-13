import React from 'react'
import styled from 'styled-components'

const choices = [
  {
    title: '대시보드',
    description: '소속 멤버, 업무 진행도 \n 나의 하루 업무 관리',
  },
  {
    title: '워크스페이스 설정',
    description: '프로젝트 별로 구분된\n팀원 및 일정, 업무 관리',
  },
  {
    title: '티켓 발급',
    description: '업무 단위별 티켓 발급 및\n티켓별 일정 관리',
  },
  {
    title: '이슈 관리',
    description: '이슈 내용, 내용, 담당자 및\n이슈별 상태값 관리',
  },
]

const Section4 = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>
          HI-DICE의 다양한 기능들은
          <br />
          <TextHighlight>프로젝트 관리를 용이</TextHighlight>하게 만듭니다.
        </Text>
        <ContentWrapper>
          <ChoiceBoxContainer>
            {choices.map((choice, index) => (
              <ChoiceBox key={index}>
                <Choose />
                <TextContainer>
                  <MainText>{choice.title}</MainText>
                  <SubText>{choice.description}</SubText>
                </TextContainer>
              </ChoiceBox>
            ))}
          </ChoiceBoxContainer>
          <Noimg src="/images/noimage.png" alt="noimg" />
        </ContentWrapper>
      </TextWrapper>
    </Container>
  )
}

export default Section4

const Container = styled.section`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextWrapper = styled.div`
  width: 90%;
  margin-bottom: 20px;
  margin-top: 10vh;

  flex-direction: space-between;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 40px;
  text-align: center;
`

const ContentWrapper = styled.div`
  display: flex;
`

const TextHighlight = styled.span`
  font-weight: bold;
`

const ChoiceBoxContainer = styled.div`
  display: flex;
  height: 70vh;

  margin-top: 15vh;
  margin-left: 5%;

  background-color: #f5f5f5;
  flex-direction: column;
`
const ChoiceBox = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
  background-color: white;
  border: 1px solid black;
  felx-direction: column;
  &:not(:last-child) {
    border-bottom: none;
  }
`
const Choose = styled.div`
  display: flex;
  width: 5%;
  background-color: #623ad6;
`
const TextContainer = styled.div`
  display: flex;
  width: 95%;
  flex-direction: column;
  justify-content: center;
`

const MainText = styled.div`
  font-size: 25px;
  color: #623ad6;
  font-weight: bold;
  padding: 5%;
`

const SubText = styled.div`
  display: flex;
  font-weight: medium;
  padding: 0% 5% 5% 5%;
  font-size: 17px;
`
const Noimg = styled.img`
  width: 70%;
  height: 70vh;
  display: flex;
  margin-left: 2%;
  margin-top: 15vh;
`
