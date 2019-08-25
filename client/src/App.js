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
import { Link } from "react-router-dom";
import { logout } from "./actions/auth";

class App extends Component {
  logUserOut() {
    logout();
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router>
            <div className="navbar">
              <nav className="navbar bg-dark">
                <h5>
                  <Link to="/">BucketLists</Link>
                </h5>
                <ul>
                  <li>
                    <a onClick="" href="#!">
                      <i className="fas fa-sign-out-alt" />{" "}
                      <span className="hide-sm">Logout</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <section className="container">
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
