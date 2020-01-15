import React, { Component } from "react";
import ThreadForm from "./threadForm";
import { getThread } from "../services/messageService";
import { Link, useHistory } from "react-router-dom";

class ThreadView extends Component {
  state = {
    threads: []
  };

  async componentDidMount() {
    try {
      const { id } = await this.props.match.params;
      const { data: thread } = await getThread(id);
      let threads = []
      threads.push(thread)
      await this.setState({ threads });
      console.log("Intake", thread)
      console.log("Update", this.state);
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        window.location = "/not-found";
      }
    }
  }

  //   refreshThreads = async () => {
  //     const { data: threads } = await getThreads();
  //     this.setState({ threads });
  //   };
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
  addDefaultSrc(ev) {
    ev.target.src =
      "https://dubsism.files.wordpress.com/2017/12/image-not-found.png?w=768";
  }

  render() {
    const {threads} = this.state;
    // console.log("state?", this.state.threads[0]._id)
    // console.log("threads?", this.state.threads._id)
    // if (threads[0]._id) {
    if (threads) {
      return (
        <div>
          {/* <div className="threads backc">
            <div className="">
              <div className="thread-outer">
                <div key={thread._id} className="thread-container">
                  {thread.imageURL && (
                    <div className="blackc">
                      <a href={thread.imageURL}>
                        <img
                          className="thread-image blackc"
                          src={thread.imageURL}
                          alt=""
                          onError={this.addDefaultSrc}
                        />
                      </a>
                    </div>
                  )}
                  <div className="thread-details pl-2">
                    <div className="thread-username text-secondary">/{thread.username}</div>
                    <div className="thread-subject">{thread.subject}</div>
                    <div className="thread-message">{thread.message}</div>
                    <div>{thread.karma}</div>
                    <div className="thread-date">{thread.datePosted}</div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      );
    }
    else return null
  }
}

export default ThreadView;
