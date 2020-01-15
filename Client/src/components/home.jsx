import React, { Component } from "react";
import ThreadForm from "./threadForm";
import { getThreads } from "../services/messageService";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    threads: [],
    threadFormToggle: true
  };

  async componentDidMount() {
    const { data: threads } = await getThreads();
    this.setState({ threads });
  }

  refreshThreads = async () => {
    const { data: threads } = await getThreads();
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
  handleThreadToggle = async () => {
    await this.setState({ threadFormToggle: !this.state.threadFormToggle });
  };
  addDefaultSrc(ev) {
    ev.target.src = "https://bitsofco.de/content/images/2018/12/broken-1.png";
  }
  ellipsify = (str, x = 10) => {
    if (str.length > x) {
      return str.substring(0, x) + "...";
    } else {
      return str;
    }
  };

  render() {
    const { threads } = this.state;

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
        <div className="threads backc">
          <div className="">
            {threads.map(thread => (
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
                    {/* <Link to={`/threads/${thread._id}`} className="link-opt">
                    <div className="thread-subject">
                      {this.ellipsify(thread.subject, 30)}
                    </div>
                    <div className="thread-message">
                      {this.ellipsify(thread.message, 50)}
                    </div>
                    <div className="thread-date">{thread.datePosted}</div>
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
