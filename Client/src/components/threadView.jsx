import React, { Component } from "react";
import {
  getThread,
  upvoteThread,
  removeUpvoteThread,
  getComments
} from "../services/messageService";
import ThreadPost from "./threadPost";
import CommentForm from "./commentForm";
import { Link } from "react-router-dom";

class ThreadView extends Component {
  state = {
    threads: "",
    ogThreads: [],
    comments: ""
  };

  async componentDidMount() {
    try {
      const { id } = this.props.match.params;
      const { data: thread } = await getThread(id);
      const { data: comments } = await getComments(id);
      console.log("this be comments", comments);
      let threads = [];
      threads.push(thread);
      this.setState({ threads, ogThreads: threads, comments });
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
  refreshThreads = async id => {
    const { data: thread } = await getThread(id);
    let threads = [];
    threads.push(thread);
    this.setState({ threads });
  };
  refreshComments = async id => {
      const { data: comments } = await getComments(id);;
    this.setState({ comments });
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
    const { threads, comments } = this.state;
    if (threads) {
      console.log("checking threads", threads[0]._id);
      return (
        <div>
          <ThreadPost
            className="p-3"
            threads={threads}
            addDefaultSrc={this.props.addDefaultSrc}
            ellipsify={this.props.ellipsify}
            ellipse={[Infinity, Infinity]}
            toggleKarma={this.toggleKarma}
            currentKarma={this.currentKarma}
          />
          <CommentForm _id={threads[0]._id} refresh={this.refreshComments}/>
          <div className="comments-container">
            {comments.map(comment => (
              <div>
                <div className="thread-username text-secondary">
                  /{comment.username} - {comment._id}
                </div>
                <div>{comment.comment}</div>
                <div>{comment.datePosted}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else return null;
  }
}

export default ThreadView;
