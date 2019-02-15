import React from "react";
import { connect } from "react-redux";
import { PlayGame } from "../stores/actions/index";

class game extends React.PureComponent {
  componentWillMount() {
    this.props.PlayGame();
  }

  render() {
    console.log(this.props);
    return <>test</>;
  }
}

export default connect(
  ({ CardReducer }) => ({ CardReducer }),
  { PlayGame }
)(game);
