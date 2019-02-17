import styled from "styled-components";
import { ResultGame, ActionCard, DisplayCard } from "<components>";

const PlayPage = ({
  playerCards,
  serverCards,
  hit,
  stand,
  resultGame,
  restart,
  countdown
}) => {
  return (
    <Container>
      {resultGame ? <ResultGame resultGame={resultGame} /> : null}

      <FlexCenterContainer>
        <DisplayCard
          cards={playerCards}
          name="player"
          label="Your Cards"
          winner={resultGame ? resultGame.who : ""}
        />
        <DisplayCard
          cards={serverCards}
          name="server"
          label="Server Cards"
          winner={resultGame ? resultGame.who : ""}
        />
      </FlexCenterContainer>

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

const FlexCenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
