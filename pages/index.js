import React from "react";
import { connect } from "react-redux";
import { PlayGame, HitCard, StandCard, RestartGame } from "<actions>";
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

  _hit() {
    const { username } = this.state;
    this.props.HitCard(username);
  }

  _restart() {
    this.props.RestartGame();
    this.setState({ playing: false });
  }

  render() {
    const { playing } = this.state;
    console.log(this.props);
    return (
      <>
        {!playing ? (
          <MainPage
            handleChange={this.handleChange}
            _Play={e => this._Play(e)}
          />
        ) : (
          <PlayPage
            playerCards={this.props.PlayerCardReducer}
            serverCards={this.props.ServerCardReducer}
            resultGame={this.props.ResultGameReducer}
            hit={() => this._hit()}
            restart={() => this._restart()}
          />
        )}
      </>
    );
  }
}

export default connect(
  ({ PlayerCardReducer, ServerCardReducer, ResultGameReducer }) => ({
    PlayerCardReducer,
    ServerCardReducer,
    ResultGameReducer
  }),
  { PlayGame, HitCard, StandCard, RestartGame }
)(Main);
