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
    comment: Joi.string().label("comment"),
    username: Joi.string().label("comment")
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
      <div className="backc border">
        <div className="mt-4 form-width">
          <form onSubmit={this.handleSubmit} className="comment-form">
            {this.renderTextArea("comment", "", "New comment")}
            <div className="comment-details">
              {this.renderInput("username", "", "username")}
              {this.renderButton("add comment", "btn btn-primary ")}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CommentForm;
