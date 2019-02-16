import styled from "styled-components";
// import { Card } from "antd";

const CardComponent = ({ code }) => {
  return (
    <Card>
      <UpperLeftContainer>{code}</UpperLeftContainer>
      <LowerRightContainer>{code}</LowerRightContainer>
    </Card>
  );
};

export default CardComponent;

const Card = styled.div`
  width: 200px;
  height: 250px;
  border-radius: 2px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const UpperLeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 5px;
`;

const LowerRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;
