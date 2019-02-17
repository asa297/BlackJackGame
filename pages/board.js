import React from "react";
import { connect } from "react-redux";
import { FetchScoreBoard } from "<actions>";
// import { MainPage, PlayPage } from "<components>";

class board extends React.PureComponent {
  componentWillMount() {
    this.props.FetchScoreBoard();
  }
  render() {
    return <>test</>;
  }
}

export default connect(
  ({ ScoreBoardReducer }) => ({ ScoreBoardReducer }),
  { FetchScoreBoard }
)(board);
