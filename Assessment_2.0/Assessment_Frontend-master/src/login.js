import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "./actions";
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

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
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
                Sign in
            </Typography>
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
              {loginError && (
                <Typography component="p" className={classes.errorText}>
                  Incorrect email or password.
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
                  Sign In
            </Button>
                <Button
                  type="button"

                  variant="outline-primary"
                  color="primary"
                  className={classes.submit}
                  href="/register"
                  style={{ marginRight: '5px' }}
                >
                  Register
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
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated

  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
