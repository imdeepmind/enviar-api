import React, { Component } from 'react';
import {
  Button,
  Input
} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Something is awesome</h1>
        <Input />
        <Button color="primary">Hello</Button>
      </div>
    );
  }
}

export default App;
