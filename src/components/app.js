import React from 'react';
import Content from './content';
import Footer from './footer/footer';
import Header from './header/header';

export default class App extends React.Component {
  render() {
    return (

      <div className="container-fluid">
        <Header />
        <div className="row">
        <Content />
      </div>
      <Footer />

      </div>
    );
  }
}
