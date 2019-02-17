import React from "react";
import { connect } from "react-redux";
import { PlayGame, HitCard, StandCard, RestartGame } from "<actions>";
import { MainPage, PlayPage } from "<components>";

let timer;
class Main extends React.PureComponent {
  state = {
    username: null,
    playing: false,
    countdown: 10
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _Play(e) {
    e.preventDefault();
    const { username } = this.state;
    if (username) {
      this.setState({ playing: true });
      this.props.PlayGame(username);
      this._countdown();
    }
  }

  _hit() {
    const { username } = this.state;
    this.props.HitCard(username);
  }

  _stand() {
    const { username } = this.state;
    clearInterval(timer);
    this.setState({ countdown: 10 });
    this.props.StandCard(username);
  }

  _restart() {
    this.props.RestartGame();
    this.setState({ playing: false, countdown: 10 });
  }

  _countdown() {
    timer = setInterval(() => {
      let { countdown, username } = this.state;
      this.setState({ countdown: --countdown });

      if (countdown === 0) {
        this.props.StandCard(username, true);
        clearInterval(timer);
      }
    }, 1000);
  }

  render() {
    const { playing } = this.state;
    // console.log(this.props);
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
            stand={() => this._stand()}
            restart={() => this._restart()}
            countdown={this.state.countdown}
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
