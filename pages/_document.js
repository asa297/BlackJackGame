import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="../static/css/antd.css" />
          <link rel="stylesheet" href="../static/css/index.css" />
          {this.props.styleTags}
        </Head>
        <body style={{ background: "#cccccc" }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
