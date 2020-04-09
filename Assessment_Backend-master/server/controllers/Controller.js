const model = require('../models').postGressModel;

// const sampleEndpoint = async (req, res) => {
// }

const sampleEndpoint = async (req, res) => {
    model.create({ message : "hello"}).then(function(task) {
      // you can now access the newly created task via the variable task
    })

    // SampleModel.query('INSERT INTO users (sampleField) VALUES ($1)', [name], (error, results) => {
    // if (error) {
    //   throw error
    // }
    res.status(201).send(`User added with ID:`)
  //})
}


const createPost = async (req, res) => {
  const mymessage = req.body.message;
  model.create({ message : mymessage}).then(function(task) {
  })
  res.status(201).send(`Post Added Successfully`)
}
const getAllPosts = async (req, res) => {
  model.findAll({
  }).then(function(posts){
    res.send({message:'posts list',data:posts});
  }).catch(function(err){
    console.log('Oops! something went wrong, : ', err);
  });
}

module.exports = {
    sampleEndpoint,
    createPost,
    getAllPosts
};