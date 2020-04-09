const postsdb = require('../models').posts;
const usersdb = require('../models').users;

// Get functions
const sampleEndpoint = async (req, res) => {
  postsdb.create({ message: "hello" }).then(function (task) {
  })
  res.status(201).send(`sample post created`)
}

const getAllPosts = async (req, res) => {
  postsdb.findAll({
    order: [
      ['createdAt', 'ASC'],
    ],
  }).then(function (posts) {
    res.send({ message: 'posts list', data: posts });
  }).catch(function (err) {
    console.log('Oops! something went wrong, : ', err);
  });
}


// Post functions
const createPost = async (req, res) => {
  const mymessage = req.body.message;
  postsdb.create({ message: mymessage }).then(function (task) {
  })
  res.status(201).send(`Post Created Successfully`)
}


const incLikes = async (req, res) => {
  const myID = req.body.id;
  console.log(myID)
  postsdb.increment(
    { likes: 1 },
    { where: { id: myID } }
  )
    .then(function (rowsUpdated) {
      res.status(201).send(`Post Like Successfully`)
    })
}

const decLikes = async (req, res) => {
  const myID = req.body.id;
  console.log(myID)
  postsdb.decrement(
    { likes: 1 },
    { where: { id: myID } }
  )
    .then(function (rowsUpdated) {
      res.status(201).send(`Post Disliked Successfully`)
    })
}

const deletePost = async (req, res) => {
  const myID = req.body.id;
  postsdb.destroy(
    { where: { id: myID } }
  )
    .then(function (rowsUpdated) {
      res.status(201).send(`Post Deleted Successfully`)
    })

}

function isIdUnique(myEmail, callback) {
  usersdb.count({ where: { email: myEmail } })
    .then(count => {
      callback(count)
    });
}

const createUser = async (req, res) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    isIdUnique(req.body.email, function (random_data) {
      if (random_data == 0) {
        usersdb.create({ username: req.body.username, email: req.body.email, password: req.body.password }).then(function (task) {
          res.status(201).send(`User created successfully`)
        })
      } else {
        res.status(201).send(`Email already exists`)
      }

    });
  } else {
    res.status(201).send(`Please fill out all fields`)
  }
}

const loginUser = async (req, res) => {
  console.log(req.body.email)
  console.log(req.body.password)
  if (req.body.email &&
    req.body.password) {
    const user = await  usersdb.findOne(
      {
        where:
        {
          email: req.body.email,
          password: req.body.password
        },
        attributes: ['id', 'username', 'email'],
      })

      console.log(user)

      if(user != null){
        res.status(201).send(user)
      }else{
        res.status(201).send(`Email or Password is invalid`)
      }
  }else{
    res.status(201).send(`Please fill out all fields`)
  }
}

  module.exports = {
    sampleEndpoint,
    createPost,
    getAllPosts,
    incLikes,
    decLikes,
    deletePost,
    createUser,
    loginUser
  };