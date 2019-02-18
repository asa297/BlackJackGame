import styled from "styled-components";
import Link from "next/link";
import { Input, Button } from "antd";

const MainPage = ({ handleChange, _Play }) => {
  return (
    <Container>
      <h1>Hi, Input Your Name And Let's fun.</h1>
      <form onSubmit={e => _Play(e)}>
        <FlexContainer>
          <Input name="username" type="text" onChange={handleChange} />
          <FormButton type="submit" ghost onClick={() => _Play()}>
            GO
          </FormButton>
        </FlexContainer>
      </form>
      <H1FlexCenter>OR</H1FlexCenter>
      <Link prefetch href="/board">
        <FlexCenterContainer>
          <Button type="submit" ghost>
            SCORE BOARD
          </Button>
        </FlexCenterContainer>
      </Link>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FlexContainer = styled.div`
  display: flex;
`;

const FormButton = styled(Button)`
  margin-left: 10px;
`;

const H1FlexCenter = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const FlexCenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
