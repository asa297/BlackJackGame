import styled from "styled-components";
import { Input, Button } from "antd";

const MainPage = ({ handleChange, _Play }) => {
  return (
    <Container>
      <h1>Hi, Input Your Name And Let's fun.</h1>
      <form onSubmit={e => _Play(e)}>
        <FlexContainer>
          <Input name="username" type="text" onChange={handleChange} />
          <FormButton type="submit" ghost>
            GO
          </FormButton>
        </FlexContainer>
      </form>
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
