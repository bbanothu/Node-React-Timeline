import React from 'react';
import { AppBar, TextField, Button, Toolbar, Typography, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 25
  },
});

function renderSamplePost(classes) {
  return (
    <Card className={classes.root}>
      <CardContent className={classes.comment}>
        <Typography >
          Sample Post
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            FINBACK670 Takehome
          </Typography>
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <div className="Newsfeed">
          <TextField
            id="standard-multiline-flexible"
            label="New Post"
            multiline
          />
          <Button variant="contained">Submit Post</Button>
          {renderSamplePost(classes)}
        </div>
      </header>
    </div>
  );
}

export default App;
