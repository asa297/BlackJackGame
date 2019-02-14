import App, { Container } from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import Head from "next/head";
import io from "socket.io-client";

class MyApp extends App {
  state = {
    socket: null
  };

  componentDidMount() {
    // connect to WS server and listen event
    const socket = io();
    this.setState({ socket });
  }

  // close socket connection
  componentWillUnmount() {
    this.state.socket.close();
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    // console.log(this.state);
    return (
      <Container>
        <Head>
          <title>My page title</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} socket={this.state.socket} />
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
