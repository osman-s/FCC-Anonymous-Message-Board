import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { bookComment, bookDelete } from "../services/bookService";

class ThreadForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      subject: "",
      message: "",
      imageURL: ""
    },
    errors: {} 
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    subject: Joi.string().required().label("Subject"),
    message: Joi.string().allow("").label("Message"),
    imageURL: Joi.string().allow("").label("imageURL"),
  };

  doSubmit = async () => {
    var currentComment = {
      _id: this.props._id,
      comment: this.state.data.comment
    };
    try {
    //   await bookComment(currentComment);
    //   this.props.refresh();
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
      <div className="forms-c thread-form">
        <div className="mt-4 form-width">
          <form onSubmit={this.handleSubmit} className="">
            {this.renderInput("username", "Username", "Anonymous")}
            {this.renderInput("password", "Password", "Keep this key safe")}
            {this.renderInput("subject", "Subject", "Enter a subject")}
            {this.renderTextArea("message", "Message", "Type your heart out! ❤️")}
            {this.renderInput("imageURL", "Image URL", "Place your image URL here")}
            {this.renderButton("Post Thread", "btn btn-primary new-button")}
          </form>
        </div>
      </div>
    );
  }
}

export default ThreadForm;
