import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import Home from "./components/Home";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <div className="navbar" />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                {/* <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                /> */}
              </Switch>
            </section>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
