import React, { Component } from 'react';
import {
  Button,
  Input
} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Input />
        <Button color="primary">Hello</Button>
      </div>
    );
  }
}

export default App;
