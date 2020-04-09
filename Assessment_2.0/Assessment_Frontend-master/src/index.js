import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Home from './home';
import Login from './login';
import Register from './register';
import './styles/index.css';

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
      </Router>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
