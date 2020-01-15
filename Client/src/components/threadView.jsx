import React, { Component } from "react";
import ThreadForm from "./threadForm";
import { getThread } from "../services/messageService";
import { Link } from "react-router-dom";

class ThreadView extends Component {
  state = {
    thread: {},
  };

  async componentDidMount() {
    const { id } = await this.props.match.params
    const { data: thread } = await getThread(id);
    this.setState({ thread });
    console.log(id)
    console.log(this.state)
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
    ev.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png";
  }

  render() {
    const { thread } = this.state;

    return (
      <div>
        <div className="threads backc">
          <div className="">
              <div className="thread-outer">
                <div key={thread._id} className="thread-container">
                  {thread.imageURL && (
                    <div className="blackc">
                      <a href={thread.imageURL}>
                        <img
                          className="thread-image blackc"
                          src={thread.imageURL}
                          alt="thread-image"
                          onError={this.addDefaultSrc}
                        />
                      </a>
                    </div>
                  )}
                  <div className="thread-details pl-2">
                    <div className="thread-username">/{thread.username}</div>
                    <Link to={`/${thread._id}`} className="link-opt">
                    <div className="thread-subject">
                      {thread.subject}
                    </div>
                    <div className="thread-message">
                      {thread.message}
                    </div>
                    <div className="thread-date">{thread.datePosted}</div>
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThreadView;
