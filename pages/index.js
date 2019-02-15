import React from "react";

import Router from "next/router";

class Main extends React.PureComponent {
  state = {
    username: null
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  _Play() {
    const { username } = this.state;
    if (username) {
      // PlayGame(this.props.socket, { username });
      Router.push("/game");
      // this.props.socket.on("matchroom", room => {
      //   console.log(room);
      // });
    }
  }

  render() {
    return (
      <>
        <input name="username" type="text" onChange={this.handleChange} />
        <button onClick={() => this._Play()}>play</button>
      </>
    );
  }
}

export default Main;
