import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { BoardComponent } from "<components>";
import { FetchScoreBoard } from "<actions>";

class board extends React.PureComponent {
  componentWillMount() {
    this.props.FetchScoreBoard();
  }
  render() {
    return (
      <>
        <H1Center>Leader Board</H1Center>
        <BoardComponent data={this.props.ScoreBoardReducer} />
      </>
    );
  }
}

export default connect(
  ({ ScoreBoardReducer }) => ({ ScoreBoardReducer }),
  { FetchScoreBoard }
)(board);

const H1Center = styled.h1`
  margin: 10px 0px;
  text-align: center;
`;
