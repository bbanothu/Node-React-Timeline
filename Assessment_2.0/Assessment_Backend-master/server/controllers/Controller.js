const postsdb = require('../models').posts;
const usersdb = require('../models').users;
const likesdb = require('../models').likes;
const { Op } = require("sequelize");


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

const getAllLikes = async (req, res) => {
  likesdb.findAll(
    { where: { email: req.body.email  
    
    
    } }
  )
  
    .then(function (posts) {
    res.send({ data: posts });
  }).catch(function (err) {
    console.log('Oops! something went wrong, : ', err);
  });
}

const getMyPosts = async (req, res) => {
  postsdb.findAll(
    {where: {
      [Op.or]: [{username: req.body.username}, {username: 'ANON'}]
    }}
  )
  
    .then(function (posts) {
    res.send({  data: posts });
  }).catch(function (err) {
    console.log('Oops! something went wrong, : ', err);
  });
}



// Post functions
const createPost = async (req, res) => {
  const mymessage = req.body.message;
  if(req.body.username){
    postsdb.create({ message: mymessage , username: req.body.username}).then(function (task) {
    })
  }else{
    postsdb.create({ message: mymessage }).then(function (task) {
    })
  }
  res.status(201).send(`Post Created Successfully`)
}


const incLikesUser = async (req, res) => {
  const myEmail = req.body.email;
  const myPostId = req.body.postId;
  likesdb.create({ email: myEmail , postId: myPostId}).then(function (task) {
  })
  postsdb.increment(
    { likes: 1 },
    { where: { id: myPostId } }
  )
  
    .then(function (rowsUpdated) {
      res.status(201).send(`Post Like Successfully`)
    })
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
  postsdb.increment(
    { likes: -1 },
    { where: { id: myID } }
  )
    .then(function (rowsUpdated) {
      res.status(201).send(`Post Disliked Successfully`)
    })
}

const decLikesUser = async (req, res) => {
  const myEmail = req.body.email;
  const myPostId = req.body.postId;
  likesdb.destroy(
    { where: { postId: myPostId } }
  )
  postsdb.increment(
    { likes: -1 },
    { where: { id: myPostId } }
  )
  
    .then(function (rowsUpdated) {
      res.status(201).send(`Liked post deleted Successfully`)
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
        res.status(400).send(`Email already exists`)
      }

    });
  } else {
    res.status(400).send(`Please fill out all fields`)
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
        //throw new Error('something bad happened');
        res.status(201).send(user)
      }else{
        //throw new Error('something bad happened');
        res.status(400).send(`Email or Password is invalid`)
      }
  }else{
    res.status(400).send(`Please fill out all fields`)
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
    loginUser,
    incLikesUser,
    decLikesUser,
    getAllLikes,
    getMyPosts
  };