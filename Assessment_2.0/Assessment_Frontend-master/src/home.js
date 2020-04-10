import React, { useState, Component } from 'react';
import { AppBar, TextField, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            myValue: '',
            posts: []
        }
        this.loadJson(this.state.myUser)
    }

    // functions
    loadJson() {
        fetch("http://localhost:3000/api/getAllPosts")
            .then(res => res.json()).then((data) => {
                this.setState({ posts: data })
            })
    }

    handleLike(myId) {
        axios.post(`http://localhost:3000/api/incLikes`, { id: myId })
            .then(res => {
            })
        window.location.reload();
    };

    handleDislike(myId) {
        axios.post(`http://localhost:3000/api/decLikes`, { id: myId })
            .then(res => {
            })
        window.location.reload();
    };

    handleSubmit(myMessage) {
        axios.post(`http://localhost:3000/api/createPost`, { message: myMessage })
            .then(res => {
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
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/user" />;
        } else {
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
                                {post(this.state.posts.data)}
                            </div>
                        </div>
                    </header>
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(Home);
