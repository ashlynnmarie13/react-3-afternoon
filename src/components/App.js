import React, { Component } from "react";
import axios from "axios";
import Post from "./Post/Post";
import Edit from "./Post/Edit/Edit";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }
  // fetching posts in the componentDidMount method
  // setting posts array returned from the API onto posts on state
  // making a GET request, returns an array of post objects
  // ??WHAT IS RESULTS.DATA?
  // WHY DO ONLY SOME NEED THE ID? OR TEXT?
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(results => {
      this.setState({ posts: results.data });
    });
  }
  //where did I get the link below???????
  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(results => {
        this.setState({ posts: results.data });
      });
  }
  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(results => {
        this.setState({ posts: results.data });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(post => (
            <Post
              id={post.id}
              key={post.id}
              text={post.text}
              date={post.date}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
      // above I'm rendering a Post component for each post
      // taking the posts array and mapping over it
      // you need a unique key property, we're using the id of the post
      // IS POSTS THE SAME AS RESULTS?
    );
  }
}

export default App;
