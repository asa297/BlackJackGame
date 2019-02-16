import styled from "styled-components";
import { Button } from "antd";
import { CardComponent } from "<components>";

const PlayPage = ({ cards }) => {
  return (
    <Container>
      <DisplayCard>
        {cards.map(card => {
          return (
            <CardContainer>
              <CardComponent code={card.code} key={card.key} />
            </CardContainer>
          );
        })}
      </DisplayCard>
      <ActionCard>
        <ActionContainer>
          <ActionButton ghost border="red">
            Hit
          </ActionButton>
        </ActionContainer>
        <ActionContainer>
          <ActionButton ghost border="green">
            Stand
          </ActionButton>
        </ActionContainer>
      </ActionCard>
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

const ActionCard = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const ActionButton = styled(Button)`
  :hover {
    border-color: ${props => props.border};
    color: ${props => props.border};
  }
`;

const ActionContainer = styled.div`
  padding: 5px;
`;
