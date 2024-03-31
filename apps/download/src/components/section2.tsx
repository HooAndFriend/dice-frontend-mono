import React from 'react'
import styled from 'styled-components'

const Section2 = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>
          HI-DICE만의 <br />
          프로젝트 <TextHighlight>관리 용어</TextHighlight>
        </Text>
        <Description>
          유저에게 익숙한 단어들로 <br />
          사용에 어려움을 겪지 않도록 합니다
        </Description>
      </TextWrapper>
      <Boxes>
        <Box>
          <BoxImage src="/images/ticket.png" alt="1" />
          <BoxName>Ticket</BoxName>
          <BoxDescription>하나의 업무를 나타낸 작은 단위</BoxDescription>
        </Box>
        <Box>
          <BoxImage src="/images/epic.png" alt="1" />
          <BoxName>Epic</BoxName>
          <BoxDescription>유사한 티켓끼리 묶은 큰 단위</BoxDescription>
        </Box>
        <Box>
          <BoxImage src="/images/sprint.png" alt="1" />
          <BoxName>Sprint</BoxName>
          <BoxDescription>일정별로 티켓을 묶은 하나의 단위</BoxDescription>
        </Box>
      </Boxes>
    </Container>
  )
}

export default Section2

const Container = styled.section`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
  padding-top: 20%;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Text = styled.span`
  font-weight: 500;
  font-size: 50px;

  @media (max-width: 1429px) {
    font-size: 40px;
  }

  @media (max-width: 947px) {
    font-size: 30px;
  }
`

const TextHighlight = styled.span`
  font-weight: bold;
`

const Description = styled.span`
  font-size: 28px;
  padding-top: 80px;
  font-weight: 500;

  @media (max-width: 1429px) {
    font-size: 20px;
  }

  @media (max-width: 947px) {
    font-size: 13px;
  }
`

const Boxes = styled.div`
  display: flex;
`

const Box = styled.div`
  background-color: #fff;
  margin-left: 20px;
  width: 250px;
  height: 290px;
  box-shadow: 0px 0px 15px 0px #d8d8d8;

  @media (max-width: 1245px) {
    width: 200px;
    height: 240px;
  }

  @media (max-width: 947px) {
    width: 130px;
    height: 200px;
  }
`

const BoxImage = styled.img`
  display: flex;
  width: 70px;
  height: 70px;
  margin: 30px auto 0;
  text-align: center;
`

const BoxName = styled.div`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const BoxDescription = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
  padding: 10px;
`
