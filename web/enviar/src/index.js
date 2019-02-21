import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

import './assets/css/lux/bootstrap.min.css';
import './assets/css/lux/_variables.scss';
import './assets/css/lux/_bootswatch.scss';


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
