import styled from "styled-components";
import { CardComponent } from "<components>";

const DisplayCard = ({ cards, label, name, winner }) => {
  return (
    <Container>
      <H1CenterContainer>{label}</H1CenterContainer>
      <FlexContainer name={name || ""} winner={winner || ""}>
        {cards.map((card, index) => {
          return (
            <CardContainer key={index}>
              <CardComponent code={card.code} />
            </CardContainer>
          );
        })}
      </FlexContainer>
    </Container>
  );
};
export default DisplayCard;

const Container = styled.div`
  margin: 5px;
`;

const CardContainer = styled.div`
  padding: 10px;
`;

const H1CenterContainer = styled.h1`
  display: flex;
  justify-content: center;
`;

const FlexContainer = styled.div`
  display: flex;
  border: ${props =>
    props.name === props.winner.toLowerCase()
      ? "1px solid blue"
      : "1px solid #fff"};
`;
