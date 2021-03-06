import React, { useState, Component } from 'react';
import { AppBar, TextField, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import { logoutUser } from "./actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

class admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myValue: '',
      likes: [],
      posts: [],
      myPosts: [],
      myUser: this.props.user.data
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadJson(this.state.myUser)
  }


  loadJson(user) {
    axios.post("http://localhost:3000/api/getAllLikes", { email: user.email }).then((res) => {
      this.setState({ likes: res.data })
    })
    axios.post("http://localhost:3000/api/getMyPosts", { username: user.username }).then((res) => {
      this.setState({ myPosts: res.data })
    })
    axios.get("http://localhost:3000/api/getAllPosts").then((res) => {
      this.setState({ posts: res.data })
    })
  }

  handleLike(myPostId, myEmail) {
    axios.post(`http://localhost:3000/api/incLikesUser`, { email: myEmail, postId: myPostId })
      .then(res => {
      })
    window.location.reload();
  };

  handleDislike(myPostId, myEmail) {
    axios.post(`http://localhost:3000/api/decLikesUser`, { email: myEmail, postId: myPostId })
      .then(res => {
      })
    window.location.reload();
  };


  handleDelete(myId) {
    axios.post(`http://localhost:3000/api/deletePost`, { id: myId })
      .then(res => {
      })
    window.location.reload();
  };

  handleSubmit(myMessage, myUsername) {
    axios.post(`http://localhost:3000/api/createPost`, { message: myMessage, username: myUsername })
      .then(res => {
      })
    window.location.reload();
  };

  handleChange = (e) => this.setState({
    myValue: e.target.value
  })

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  containsLikes(a, obj) {
    if (a == null) {
      return false
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i].postId === obj) {
        return true;
      }
    }
    return false;
  }

  containsPosts(a, obj) {
    if (a == null) {
      return false
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i].id === obj) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { isLoggingOut, logoutError, user } = this.props;
    const post = (likes, posts, myPosts) => {
      if (posts == null) {
        return (
          <div></div>
        )
      } else {
        return (
          <Card >
            {posts.map((post, index) => (
              <div key={index} >
                <CardContent >
                  <Typography style={{ textAlign: "left" }}>
                    {post.username}
                  </Typography>
                  <Typography >
                    {post.message}
                  </Typography>
                </CardContent>
                <CardActions>
                  {(() => {
                    if (this.containsLikes(likes, post.id)) {
                      return (
                        <Button size="small" variant="outline-warning" onClick={this.handleDislike.bind(this, post.id)} >Dislike &nbsp;
                          {post.likes}
                        </Button>)
                    } else {
                      return (
                        <Button size="small" variant="outline-success" onClick={this.handleLike.bind(this, post.id, user.data.email)} >Likes &nbsp;
                          {post.likes}
                        </Button>)
                    }
                  })()}
                  {(() => {
                    if (this.containsPosts(myPosts, post.id)) {
                      return (
                        <Button size="small" variant="outline-danger" onClick={this.handleDelete.bind(this, post.id)} >Delete</Button>)
                    } else {
                    }
                  })()}
                </CardActions>
              </div>
            ))}
          </Card>
        )
      }
    }
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              FINBACK670 Assessment
            </Typography>
            <Button
              type="button"
              variant="primary"
              onClick={this.handleLogout}
              style={{ position: "absolute", right: 10 }}>
              Logout
              </Button>
            {isLoggingOut && <p>Logging Out....</p>}
            {logoutError && <p>Error logging out</p>}
          </Toolbar>
        </AppBar>
        <header className="App-header">
          <div className="Newsfeed">
            <TextField
              id="standard-multiline-flexible"
              label="New Post"
              multiline
              onChange={this.handleChange}
            />
            <Button
              onClick={this.handleSubmit.bind(this, this.state.myValue, user.data.username)}
              variant="outline-primary">Submit Post
            </Button>
            <div style={{ paddingTop: '20px' }}>
              {post(this.state.likes.data, this.state.posts.data, this.state.myPosts.data)}
            </div>
          </div>
        </header>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(admin);