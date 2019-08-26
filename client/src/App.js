import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <section className="">
              <Alert />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/home" component={Home} />
              </Switch>
            </section>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
