import React from "react";

class Main extends React.PureComponent {
  testfunction() {
    this.props.socket.emit("joinroom", { id: 5 });
  }

  render() {
    return (
      <div>
        Hello Example <button onClick={() => this.testfunction()}>test</button>
      </div>
    );
  }
}

export default Main;
