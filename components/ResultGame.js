import styled from "styled-components";

const ResultGame = ({ resultGame }) => {
  const { who, status, point } = resultGame;
  return (
    <div>
      <FlexCenterContainer>
        <h1>The Winner is : {who}</h1>
      </FlexCenterContainer>
      <FlexCenterContainer>
        <h3>
          Score : {point} ({status})
        </h3>
      </FlexCenterContainer>
    </div>
  );
};

export default ResultGame;

const FlexCenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
