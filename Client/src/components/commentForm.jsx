import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { bookComment } from "../services/bookService";

class CommentForm extends Form {
  state = {
    data: { _id: "", comment: "" },
    errors: {}
  };

  schema = {
    _id: Joi.string()
      .required()
      .label("BookId"),
    comment: Joi.string()
      .label("Comment")
  };

  doSubmit = async () => {
    try {
      await bookComment(this.state.data);
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
      <div className="forms-c">
        <div>
          <h1>Post Comment:</h1>
          <form onSubmit={this.handleSubmit} className="widther">
            {this.renderInput("_id", "BookId to comment on:", "")}
            {this.renderInput("comment", "comment:", "")}
            {this.renderButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default CommentForm;
