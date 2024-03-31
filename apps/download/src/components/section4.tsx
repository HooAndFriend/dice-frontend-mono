import React from 'react'
import styled from 'styled-components'

const Section4 = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>
          HI-DICE의 다양한 기능들은
          <br />
          <TextHighlight> 프로젝트 관리를 용이</TextHighlight>하게 만듭니다.
        </Text>
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
