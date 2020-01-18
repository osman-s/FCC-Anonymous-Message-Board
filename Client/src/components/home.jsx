import React, { Component } from "react";
import ThreadForm from "./threadForm";
import {
  getThreads,
  upvoteThread,
  removeUpvoteThread,
  deleteThread
} from "../services/messageService";
import { Link } from "react-router-dom";
import ThreadPost from "./threadPost";

class Home extends Component {
  state = {
    threads: [],
    ogThreads: [],
    threadFormToggle: true
  };

  async componentDidMount() {
    try {
      const { data: threads } = await getThreads();
      this.setState({ threads, ogThreads: threads });
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        // window.location = "/not-found";
        console.log("Error loading data from database");
      }
    }
  }
  refreshThreads = async thread => {
    try {
      if (thread) {
        const { data: threads } = await getThreads();
        const ogThreads = [...this.state.ogThreads];
        ogThreads.push(thread);
        this.setState({ threads, ogThreads });
      } else {
        const { data: threads } = await getThreads();
        console.log("refresh", threads);
        this.setState({ threads: threads });
        console.log("set state refresh", this.state);
      }
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        // logger
      }
    }
  };
  currentKarma = id => {
    try {
      const thread = this.state.ogThreads.filter(thread => thread._id === id);
      return thread[0].karma;
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        // logger
      }
    }
  };
  toggleKarma = async thread => {
    if (thread.karma <= this.currentKarma(thread._id)) {
      await upvoteThread(thread._id);
    } else {
      await removeUpvoteThread(thread._id);
    }
    this.refreshThreads();
  };
  handleThreadToggle = async () => {
    this.setState({ threadFormToggle: !this.state.threadFormToggle });
    console.log("toggled");
  };

  handleDelete = async id => {
    try {
      await deleteThread(id);
      this.refreshThreads();
      //   window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { threads } = this.state;
    console.log("Current state", this.state);
    return (
      <div>
        <div className="toggle-thread">
          <button
            className="btn btn-secondary toggle-thread-button"
            onClick={this.handleThreadToggle}
          >
            Toggle Thread Form
          </button>
        </div>
        {this.state.threadFormToggle && (
          <ThreadForm
            toggle={this.handleThreadToggle}
            refresh={this.refreshThreads}
          />
        )}
        <ThreadPost
          threads={threads}
          addDefaultSrc={this.props.addDefaultSrc}
          ellipsify={this.props.ellipsify}
          ellipse={[50, 30]}
          toggleKarma={this.toggleKarma}
          currentKarma={this.currentKarma}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Home;
