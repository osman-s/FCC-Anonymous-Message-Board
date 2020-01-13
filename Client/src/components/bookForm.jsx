import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { bookPost } from "../services/bookService";

class BookForm extends Form {
  state = {
    data: { title: "" },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title")
  };

  doSubmit = async () => {
    try {
      await bookPost(this.state.data);
      this.props.refresh();
      // window.location = "/";
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
         <h1>Post Book:</h1>
        <form onSubmit={this.handleSubmit} className="widther">
          {this.renderInput("title", "Title:", "")}
          {this.renderButton("Submit")}
        </form> 
        </div>
        
      </div>
    );
  }
}

export default BookForm;