import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { bookComment, bookDelete } from "../services/bookService";

class CommentForm extends Form {
  state = {
    data: { comment: "" },
    errors: {}
  };

  schema = {
    comment: Joi.string()
      .label("comment")
  };

  doSubmit = async () => {
    var currentComment = {
      _id: this.props._id,
      comment: this.state.data.comment
    };
    try {
      await bookComment(currentComment);
      this.props.refresh();
      this.setState({ data: { comment: "" }})
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
      <div className="forms-c">
        <div className="mt-4">
          <form onSubmit={this.handleSubmit} className="">
            {this.renderTextArea("comment", "", "New comment")}
            {this.renderButton("Comment")}
          </form>
        </div>
      </div>
    );
  }
}

export default CommentForm;
