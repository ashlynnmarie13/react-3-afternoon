import React, { Component } from "react";

import "./Edit.css";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *POST* COMPONENT

export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
    this.updatePostFn = this.updatePostFn.bind(this);
    this.updatePost = this.updatePost.bind(this);
  }

  updateText(value) {
    this.setState({ text: value });
  }
  // getting Edit button functional
  // this method gets called when a user clicks update
  // keeping track of text with "state"
  // calling updatePostFn with id and text
  // calling hideEdit to hide the edit component
  updatePost() {
    const { text } = this.state;
    const { id, updatePostFn, hideEdit } = this.props;

    updatePostFn(id, text);
    hideEdit();
  }

  render() {
    // More destructuring!
    const { hideEdit } = this.props;
    const { text } = this.state;

    return (
      <section className="Edit__parent">
        {/* This is the input field where you can edit the text */}
        <textarea
          className="Edit__textarea"
          value={text}
          onChange={e => this.updateText(e.target.value)}
        />

        <div className="Edit__controls">
          {/* This saves your changes made */}
          <button
            id="Edit__controls-update"
            className="Edit__control-btn"
            onClick={this.updatePost}
          >
            Update
          </button>

          {/* This cancels the edit mode and does not save changes. Remember the "hideEdit" method was passed down through props */}
          <button
            id="Edit__controsl-cancel"
            className="Edit__control-btn"
            onClick={hideEdit}
          >
            Cancel
          </button>
        </div>
      </section>
    );
  }
}
