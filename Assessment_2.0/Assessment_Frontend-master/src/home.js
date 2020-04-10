import React, { useState, Component } from 'react';
import { AppBar, TextField, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import Async from "react-async"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            myValue: '',
        }
    }


    loadJson = () =>
        fetch("http://localhost:3000/api/getAllPosts")
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(res => res.json())

    handleLike(myId) {
        console.log(myId)
        axios.post(`http://localhost:3000/api/incLikes`, { id: myId })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        window.location.reload();
    };

    handleDislike(myId) {
        axios.post(`http://localhost:3000/api/decLikes`, { id: myId })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
        window.location.reload();
      };
    

    handleSubmit(myMessage) {
        console.log(myMessage)
        axios.post(`http://localhost:3000/api/createPost`, { message: myMessage })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        window.location.reload();
    };



    handleChange = (e) => this.setState({
        myValue: e.target.value
    })

    // Render Function      
    render() {
        const post = (posts) => {
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
                                    <Button size="small" variant="outline-success" onClick={this.handleLike.bind(this, post.id)} >Likes &nbsp;
                                        {post.likes}
                                    </Button>                                
                                    <Button size="small" variant="outline-warning" onClick={this.handleDislike.bind(this, post.id)} >Dislike &nbsp;
                                        {post.likes}
                                    </Button>
                                
                                </CardActions>
                            </div>
                        ))}
                    </Card>
                )
            }
        }
        const { classes, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/user" />;
        } else {
            return (
                <Async promiseFn={this.loadJson}>
                    {({ data, error, isLoading }) => {
                        if (data)
                            return (
                                <div className="App">
                                    <AppBar position="static">
                                        <Toolbar>
                                            <Typography variant="h6">
                                                FINBACK670 Assessment
                                </Typography>
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
                                                onClick={this.handleSubmit.bind(this, this.state.myValue)}
                                                variant="outline-primary">Submit Post
                                        </Button>
                                            <div style={{ paddingTop: '20px' }}>
                                                {post(data.data)}
                                            </div>
                                        </div>
                                    </header>
                                </div>
                            )
                        return null
                    }}
                </Async>
            );
        }
    }
}
function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Home);
