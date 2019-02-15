import React from "react";
import { connect } from "react-redux";
import { PlayGame } from "<actions>";
import { CardComponent } from "<components>";

class game extends React.PureComponent {
  componentWillMount() {
    this.props.PlayGame();
  }

  render() {
    return (
      <>
        <CardComponent />
      </>
    );
  }
}

export default connect(
  ({ CardReducer }) => ({ CardReducer }),
  { PlayGame }
)(game);
