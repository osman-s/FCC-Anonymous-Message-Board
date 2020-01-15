import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ThreadView from "./components/threadView";

class App extends Component {
  state = {};

  addDefaultSrc(ev) {
    ev.target.src =
      "https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=768";
  }
  ellipsify = (str, x = 10) => {
    if (str.length > x) {
      return str.substring(0, x) + "...";
    } else {
      return str;
    }
  };
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="">
          <Switch>
            <Route
              path="/thread/:id"
              render={props => (
                <ThreadView
                  {...props}
                  addDefaultSrc={this.addDefaultSrc}
                  ellipsify={this.ellipsify}
                />
              )}
            />
            <Route
              path="/home"
              render={props => (
                <Home
                  {...props}
                  addDefaultSrc={this.addDefaultSrc}
                  ellipsify={this.ellipsify}
                />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
