import styled from "styled-components";
import { CardComponent, ResultGame, ActionCard } from "<components>";

const PlayPage = ({
  playerCards,
  hit,
  stand,
  resultGame,
  restart,
  countdown
}) => {
  return (
    <Container>
      {resultGame ? <ResultGame resultGame={resultGame} /> : null}

      <DisplayCard>
        {playerCards.map((card, index) => {
          return (
            <CardContainer key={index}>
              <CardComponent code={card.code} />
            </CardContainer>
          );
        })}
      </DisplayCard>
      <ActionCard
        hit={hit}
        stand={stand}
        resultGame={resultGame}
        restart={restart}
        countdown={countdown}
      />
    </Container>
  );
};

export default PlayPage;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CardContainer = styled.div`
  padding: 5px;
`;

const DisplayCard = styled.div`
  display: flex;
  justify-content: center;
`;
