import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "./actions";
import { withStyles } from "@material-ui/styles";
import { AppBar, TextField, Toolbar, Typography } from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
});

class register extends Component {
  state = { myUsername: "", myEmail: "", myPassword: "", myPasswordConf: "", message: "" };

  handleUserChange = ({ target }) => {
    this.setState({ myUsername: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ myEmail: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ myPassword: target.value });
  };
  handlePasswordConfChange = ({ target }) => {
    this.setState({ myPasswordConf: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { myUsername, myEmail, myPassword, myPasswordConf } = this.state;

    const hello = dispatch(registerUser(myUsername, myEmail, myPassword, myPasswordConf));
    this.setState({ message: hello });
    console.log(hello)
  };

  render() {
    const { classes, registerError, registerSuccess, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/user" />;
    } else {
      return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                FINBACK670 Assessment
    </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
            </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="email"
                onChange={this.handleUserChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handlePasswordChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="passwordConf"
                label="Confirm Pasword"
                type="password"
                id="passwordConf"
                onChange={this.handlePasswordConfChange}
              />
              {registerError && (
                <Typography component="p" className={classes.errorText}>
                  Email is already in use!
                </Typography>
              )}
              {registerSuccess && (
                <Typography component="p" className={classes.errorText}>
                  Account was successfully created!
                </Typography>
              )}

              <div>
                <Button
                  type="button"

                  variant="outline-primary"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                  style={{ marginRight: '5px' }}
                >
                  Register
            </Button>
                <Button
                  type="button"

                  variant="outline-primary"
                  color="primary"
                  className={classes.submit}
                  href="/"
                  style={{ marginRight: '5px' }}
                >
                  Sign in
            </Button>
                <Button
                  type="button"

                  variant="outline-primary"
                  color="primary"
                  className={classes.submit}
                  href="/home"
                  style={{ marginRight: '5px' }}
                >
                  Home
            </Button>
              </div>
            </Paper>
          </Container>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    registerError: state.auth.registerError,
    registerSuccess: state.auth.registerSuccess,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default withStyles(styles)(connect(mapStateToProps)(register));
