import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { bookComment, bookDelete } from "../services/bookService";

class CommentForm extends Form {
  state = {
    data: { comment: "", username: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .alphanum()
      .label("username"),
    comment: Joi.string().label("comment")
  };

  doSubmit = async () => {
    var comment = {
      _id: this.props._id,
      username: this.state.username,
      comment: this.state.data.comment
    };
    try {
      await bookComment(comment);
      this.props.refresh();
      this.setState({ data: { comment: "" } });
      //   window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  handleDelete = async () => {
    try {
      await bookDelete(this.props._id);
      this.props.refresh();
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
    return (
      <div className="backc comment-form">
        <div className=" p-2">
          <div className="mt-4 comment-width">
            <form onSubmit={this.handleSubmit} className="">
              {this.renderTextArea("comment", "", "New comment")}
              <div className="comment-details">
                {this.renderInput("username", "", "username")}
                {this.renderButton("Comment", "btn btn-primary comment-button")}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentForm;
