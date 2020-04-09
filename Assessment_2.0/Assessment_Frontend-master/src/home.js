import React, { useState, Component } from 'react';
import { AppBar, TextField, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Async from "react-async"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            myValue: '',
            myPosts: []
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

    handleDelete(myId) {
        console.log(myId)
        axios.post(`http://localhost:3000/api/deletePost`, { id: myId })
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
        // const mystyle = {
        //     root: {
        //         minWidth: 275,
        //         marginTop: 25,
        //         paddingTop: '120px'
        //     },
        // }
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
                                    <Button size="small" variant="outline-danger" onClick={this.handleDelete.bind(this, post.id)} >Delete</Button>
                                </CardActions>
                            </div>
                        ))}
                    </Card>
                )
            }
        }
        return (

            <Async promiseFn={this.loadJson}>
                {({ data, error, isLoading }) => {
                    // if (isLoading) return <div style={{ marginTop: "3em" }}>
                    //     <img alt="loading" src={Loading} style={{
                    //         display: "block",
                    //         marginLeft: "auto",
                    //         marginRight: "auto"
                    //     }} ></img></div>
                    // if (error) return `Something went wrong: ${error.message}`
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
export default Home;
