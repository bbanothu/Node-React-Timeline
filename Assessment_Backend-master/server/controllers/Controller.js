const postsdb = require('../models').posts;

// Get functions
const sampleEndpoint = async (req, res) => {
  postsdb.create({ message : "hello"}).then(function(task) {
    })
    res.status(201).send(`User added with ID:`)
}

const getAllPosts = async (req, res) => {
  postsdb.findAll({
  }).then(function(posts){
    res.send({message:'posts list',data:posts});
  }).catch(function(err){
    console.log('Oops! something went wrong, : ', err);
  });
}


// Post functions
const createPost = async (req, res) => {
  const mymessage = req.body.message;
  postsdb.create({ message : mymessage}).then(function(task) {
  })
  res.status(201).send(`Post Created Successfully`)
}


const incLikes = async (req, res) => {
  const myID = req.body.id;
  console.log(myID)
  postsdb.increment(
    {likes: 1 },
    {where: {id: myID}}
  )
  .then(function(rowsUpdated) {
    res.status(201).send(`Post Like Successfully`)
  })
}

const decLikes = async (req, res) => {
  const myID = req.body.id;
  console.log(myID)
  postsdb.decrement(
    {likes: 1 },
    {where: {id: myID}}
  )
  .then(function(rowsUpdated) {
    res.status(201).send(`Post Disliked Successfully`)
  })
}

const deletePost = async (req, res) => {
  const myID = req.body.id;
  postsdb.destroy(
    {where: {id: myID}}
  )
  .then(function(rowsUpdated) {
    res.status(201).send(`Post Deleted Successfully`)
  })

}

module.exports = {
    sampleEndpoint,
    createPost,
    getAllPosts,
    incLikes,
    decLikes,
    deletePost
};