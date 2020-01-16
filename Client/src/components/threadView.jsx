import React, { Component } from "react";
import { getThread } from "../services/messageService";
import {
  getThreads,
  upvoteThread,
  removeUpvoteThread
} from "../services/messageService";
import ThreadPost from "./threadPost";
import { Link } from "react-router-dom";

class ThreadView extends Component {
  state = {
    threads: [],
    ogThreads: []
  };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const { data: thread } = await getThread(id);
      let threads = [];
      threads.push(thread);
      this.setState({ threads, ogThreads: threads });;
      console.log("Update", this.state);
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        window.location = "/not-found";
      }
    }
  }
  currentKarma = id => {
    const threadish = this.state.ogThreads.filter(thread => thread._id === id);
    return threadish[0].karma;
  };
  toggleKarma = async thread => {
    if (thread.karma <= this.currentKarma(thread._id)) {
      await upvoteThread(thread._id);
    } else {
      await removeUpvoteThread(thread._id);
    }
    await this.refreshThreads(thread._id);
  };
  refreshThreads = async (id) => {
    const { data: thread } = await getThread(id);
      let threads = [];
      threads.push(thread);
      this.setState({ threads });
  };

  // refreshComments = async () => {
  //   const { data: comments } = await getComments();
  //   await this.setState({ comments });
  // };
  // refreshCurrentComments = async bookId => {
  //   await this.refreshComments();
  //   await this.handleBook(bookId);
  // };
  // handleBook = async bookId => {
  //   var currentBook = this.state.books.filter(book => {
  //     return book._id === bookId;
  //   });
  //   var currentComments = this.state.comments.filter(comment => {
  //     return comment.book._id === bookId;
  //   });
  //   await this.setState({ currentBook, currentComments });
  // };
  //   handleThreadToggle = async () => {
  //     await this.setState({ threadFormToggle: !this.state.threadFormToggle });
  //   };

  render() {
    const { threads } = this.state;
    if (threads) {
      return (
        <div>
          <ThreadPost
            threads={threads}
            addDefaultSrc={this.props.addDefaultSrc}
            ellipsify={this.props.ellipsify}
            ellipse={[Infinity, Infinity]}
            toggleKarma={this.toggleKarma}
            currentKarma={this.currentKarma}
          />
        </div>
      );
    } else return null;
  }
}

export default ThreadView;
