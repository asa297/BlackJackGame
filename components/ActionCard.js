import styled from "styled-components";
import { Button } from "antd";

const ActionCard = ({ hit, resultGame, restart }) => {
  return (
    <ActionCardComponent>
      {resultGame ? (
        <ActionButton ghost border="red" onClick={() => restart()}>
          Restart
        </ActionButton>
      ) : (
        <FlexContainer>
          <ActionContainer>
            <ActionButton ghost border="red" onClick={() => hit()}>
              Hit
            </ActionButton>
          </ActionContainer>
          <ActionContainer>
            <ActionButton ghost border="green">
              Stand
            </ActionButton>
          </ActionContainer>
        </FlexContainer>
      )}
    </ActionCardComponent>
  );
};

export default ActionCard;

const ActionCardComponent = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`;

const ActionButton = styled(Button)`
  :hover {
    border-color: ${props => props.border};
    color: ${props => props.border};
  }

  :active {
    border-color: ${props => props.border};
    color: ${props => props.border};
  }
`;

const ActionContainer = styled.div`
  padding: 5px;
`;

const FlexContainer = styled.div`
  display: flex;
`;