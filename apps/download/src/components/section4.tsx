import React from 'react'
import styled from 'styled-components'

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
            <ChoiceBox>
              <Choose />
              <TextContainer>
                <MainText>대시보드</MainText>
                <SubText>
                  소속 멤버, 업무 진행도
                  <br /> 나의 하루 업무 관리
                </SubText>
              </TextContainer>
            </ChoiceBox>
            <ChoiceBox>
              <Choose />
              <TextContainer>
                <MainText>워크스페이스 설정</MainText>
                <SubText>
                  프로젝트 별로 구분된
                  <br /> 팀원 및 일정, 업무 관리
                </SubText>
              </TextContainer>
            </ChoiceBox>
            <ChoiceBox>
              <Choose />
              <TextContainer>
                <MainText>티켓 발급</MainText>
                <SubText>
                  업무 단위별 티켓 발급 및<br /> 티켓별 일정 관리
                </SubText>
              </TextContainer>
            </ChoiceBox>
            <ChoiceBox>
              <Choose />
              <TextContainer>
                <MainText>이슈 관리</MainText>
                <SubText>
                  이슈 내용, 내용, 담당자 및<br /> 이슈별 상태값 관리
                </SubText>
              </TextContainer>
            </ChoiceBox>
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
  margin-top: 5vh;

  flex-direction: space-between;
`

const Text = styled.p`
  font-weight: 400;
  font-size: 40px;
  text-align: center;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const TextHighlight = styled.span`
  font-weight: bold;
`

const ChoiceBoxContainer = styled.div`
  display: flex;
  height: 60%;
  width: 25%;
  margin-top: 100px;
  background-color: #f5f5f5;
  flex-direction: column;

  @media (max-width: 1075px) {
    font-size: 12px;
    height: 80%;
  }
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
  font-size: 22px;
  color: #623ad6;
  font-weight: bold;
  padding: 5%;

  @media (max-width: 1075px) {
    font-size: 16px;
  }
`

const SubText = styled.div`
  display: flex;
  font-weight: medium;
  padding: 0% 5% 5% 5%;
  font-size: 17px;

  @media (max-width: 1075px) {
    font-size: 12px;
  }
`
const Noimg = styled.img`
  width: 60%;
  height: 60%;
  display: flex;
  margin-top: 100px;
  margin-left: 2%;

  @media (max-width: 1075px) {
    height: 80%;
  }
`
