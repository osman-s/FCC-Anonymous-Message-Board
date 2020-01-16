import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Comment } from "../services/messageService";

class CommentForm extends Form {
  state = {
    data: { comment: "", username: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .alphanum()
      .label("username")
      .required(),
    comment: Joi.string()
      .label("comment")
      .required()
  };

  doSubmit = async () => {
    try {
      var comment = {
        _id: this.props._id,
        username: this.state.data.username,
        comment: this.state.data.comment
      };
      await Comment(comment);
      this.props.refresh();
      this.setState({ data: { comment: "", username: "" } });
      //   window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  // handleDelete = async () => {
  //   try {
  //     await bookDelete(this.props._id);
  //     this.props.refresh();
  //     //   window.location = "/";
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       const errors = { ...this.state.errors };
  //       errors.username = ex.response.data;
  //       this.setState({ errors });
  //     }
  //   }
  // };

  render() {
    console.log("test", this.state.username, this.state.comment);
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
