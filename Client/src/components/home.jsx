import React, { Component } from "react";
import BookForm from "./bookForm";
import CommentForm from "./commentForm";
import { getBooks, getComments } from "../services/bookService";
import CurrentCommentForm from "./currentCommentForm";

class Home extends Component {
  state = {
    books: [],
    comments: [],
    currentBook: "",
    currentComments: ""
  };

  async componentDidMount() {
    const { data: books } = await getBooks();
    const { data: comments } = await getComments();
    this.setState({ books, comments });
  }

  refreshBooks = async () => {
    const { data: books } = await getBooks();
    this.setState({ books });
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

  render() {
    const { books, currentBook, currentComments } = this.state;

    return (
      <div>
        <h1></h1>
        <BookForm refresh={this.refreshBooks} />
        <CommentForm refresh={this.refreshComments} />
        <div className="right-column book-outer mt-2">
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
        </div>
      </div>
    );
  }
}

export default Home;
