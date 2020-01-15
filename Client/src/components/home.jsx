import React, { Component } from "react";
import BookForm from "./bookForm";
import CommentForm from "./commentForm";
import { getBooks, getComments } from "../services/bookService";
import CurrentCommentForm from "./currentCommentForm";
import ThreadForm from "./threadForm";
import { getThreads } from "../services/messageService";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    books: [],
    comments: [],
    currentBook: "",
    currentComments: "",
    threads: [],
    threadFormToggle: true
  };

  async componentDidMount() {
    const { data: threads } = await getThreads();
    const { data: books } = await getBooks();
    const { data: comments } = await getComments();
    this.setState({ books, comments, threads });
  }

  refreshThreads = async () => {
    const { data: threads } = await getThreads();
    this.setState({ threads });
  };
  refreshComments = async () => {
    const { data: comments } = await getComments();
    await this.setState({ comments });
  };
  refreshCurrentComments = async bookId => {
    await this.refreshComments();
    await this.handleBook(bookId);
  };
  handleBook = async bookId => {
    var currentBook = this.state.books.filter(book => {
      return book._id === bookId;
    });
    var currentComments = this.state.comments.filter(comment => {
      return comment.book._id === bookId;
    });
    await this.setState({ currentBook, currentComments });
  };
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
    const { books, currentBook, currentComments, threads } = this.state;

    return (
      <div>
        {/* <BookForm refresh={this.refreshBooks} />
        <CommentForm refresh={this.refreshComments} /> */}
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
        {/* <div className="right-column book-outer mt-2">
          {currentBook && (
            <div className="cb-border">
              <div className="book-title">{currentBook[0].title}</div>
              <div>BookId: {currentBook[0]._id}</div>
              {!currentComments.length && <div>No comments</div>}
              {currentComments.map((comment, index) => (
                <div key={comment._id}>
                  {index + 1}. {comment.comment}
                </div>
              ))}
              <CurrentCommentForm
                refresh={() => this.refreshCurrentComments(currentBook[0]._id)}
                _id={currentBook[0]._id}
              />
            </div>
          )}
        </div>
        <div className="column-container">
          <div className="book-left-column">
            {books.map(book => (
              <div key={book._id} className="book-outer">
                <div
                  className="book-container"
                  onClick={() => this.handleBook(book._id)}
                >
                  <div className="book-title book">{book.title}</div>{" "}
                  <div className="book-id book">BookId: {book._id}</div>
                  <div>
                    {
                      this.state.comments.filter(comment => {
                        return comment.book._id === book._id;
                      }).length
                    }{" "}
                    comments
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
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
                    <Link to={`/${thread._id}`} className="link-opt">
                    <div className="thread-subject">
                      {this.ellipsify(thread.subject, 30)}
                    </div>
                    <div className="thread-message">
                      {this.ellipsify(thread.message, 50)}
                    </div>
                    <div className="thread-date">{thread.datePosted}</div>
                    </Link>
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
