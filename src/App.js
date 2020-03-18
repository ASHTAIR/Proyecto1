import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Principal from './containers/Blog/Principal';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Principal />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
