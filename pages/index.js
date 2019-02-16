import React from "react";
import { connect } from "react-redux";
import { PlayGame } from "<actions>";
import { MainPage, PlayPage } from "<components>";

class Main extends React.PureComponent {
  state = {
    username: null,
    playing: false
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _Play(e) {
    e.preventDefault();
    const { username } = this.state;
    if (username) {
      this.setState({ playing: true });
      this.props.PlayGame(this.props.username);
    }
  }

  render() {
    const { playing } = this.state;
    return (
      <>
        {!playing ? (
          <MainPage
            handleChange={this.handleChange}
            _Play={e => this._Play(e)}
          />
        ) : (
          <PlayPage cards={this.props.CardReducer} />
        )}
      </>
    );
  }
}

export default connect(
  ({ CardReducer }) => ({ CardReducer }),
  { PlayGame }
)(Main);
