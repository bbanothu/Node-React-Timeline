import React, { useState, Component } from 'react';
import { AppBar, TextField, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import Async from "react-async"
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
      myUser: this.props.user.data,
      likes: [],
      posts: [],
      myPosts:[],
     
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadJson1(this.state.myUser)
    console.log(this.state.myUser.username)
    //console.log(this.state.myUser)
  }


  async loadJson() {
    var data = [];
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a'})
    };
    const requestOptions1 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'a' })
    };
    const promise1 = fetch("http://localhost:3000/api/getAllLikes", requestOptions).then(res => res.json())
    const promise2 = fetch("http://localhost:3000/api/getAllPosts").then(res => res.json())
    const promise3 = fetch("http://localhost:3000/api/getMyPosts", requestOptions1).then(res => res.json())
    data = Promise.all([promise1, promise2, promise3 ]);
    return data;
  }


   loadJson1(user) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email})
    };
    const requestOptions1 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username })
    };
    fetch("http://localhost:3000/api/getAllLikes", requestOptions).then(res => res.json()).then((data) => {
      this.setState({ likes: data })
      console.log(this.state.likes)
    })
    fetch("http://localhost:3000/api/getAllPosts").then(res => res.json()).then((data) => {
      this.setState({ posts: data })
      console.log(this.state.posts)
    })
    fetch("http://localhost:3000/api/getMyPosts", requestOptions1).then(res => res.json()).then((data) => {
      this.setState({ myPosts: data })
      console.log(this.state.myPosts)
    })
  }

  handleLike(myPostId, myEmail) {
    axios.post(`http://localhost:3000/api/incLikesUser`, { email: myEmail, postId: myPostId })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    window.location.reload();
  };

  handleDislike(myPostId, myEmail) {
    axios.post(`http://localhost:3000/api/decLikesUser`, { email: myEmail, postId: myPostId })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    window.location.reload();
  };


  handleDelete(myId) {
    axios.post(`http://localhost:3000/api/deletePost`, { id: myId })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    window.location.reload();
  };

  handleSubmit(myMessage, myUsername) {
    axios.post(`http://localhost:3000/api/createPost`, { message: myMessage, username: myUsername })
      .then(res => {
        console.log(res);
        console.log(res.data);
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

  contains(a, obj) {
    if(a == null){
      return false
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i].postId === obj) {
        return true;
      }
    }
    return false;
  }

  contains1(a, obj) {
    if(a == null){
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
        console.log(posts);
        console.log(likes);
        console.log(myPosts);
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
                    if (this.contains(likes, post.id)) {
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
                    if (this.contains1(myPosts, post.id)) {
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
                      {post(this.state.likes.data , this.state.posts.data, this.state.myPosts.data)}
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