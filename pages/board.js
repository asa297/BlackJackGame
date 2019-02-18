import React from "react";
import { connect } from "react-redux";
import { BoardComponent } from "<components>";
import { FetchScoreBoard } from "<actions>";
// import { MainPage, PlayPage } from "<components>";

class board extends React.PureComponent {
  componentWillMount() {
    this.props.FetchScoreBoard();
  }
  render() {
    return (
      <>
        <BoardComponent data={this.props.ScoreBoardReducer} />
      </>
    );
  }
}

export default connect(
  ({ ScoreBoardReducer }) => ({ ScoreBoardReducer }),
  { FetchScoreBoard }
)(board);
