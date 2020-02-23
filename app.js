const express = require('express');
const app = express();
let port = process.env.PORT
if (port == "" || port == null) {
  port = 3000;
}
const Bin = require('Bin');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


require('dotenv/config');

// Middleware (execute when a route is being hit, normally for authentication)
app.use(bodyParser.json());

/*
  Routes
*/

// Get all Bins
app.get('/Bins', async function(req,res) {
  try{
    const bins = await Bin.find();
    res.json({status: "200"});
  } catch(e) {
    res.json({message: e});
  }
});

// Post a new Bin
app.post('/Bin', async function(req, res) {
  const post = new Bin({
    lat: req.body.lat,
    long: req.body.long,
    type: req.body.type,
    postcode: req.body.postcode
  });
  try{
    const savedPost = await post.save();
    res.json({status: "200"});
  } catch(e) {
    res.json({message: e});
  }
})

// Get Bin by id
app.get('/Bin/:id', async function(req, res) {
  try {
    const bin = await Bin.findById(req.params.id);
    res.json({status: "200"});
  } catch (e) {
    res.json({message: e});
  }
});

// Delete Bin by id
app.delete('/Bin/:id', async function(req, res) {
  try{
    const bin = await Bin.remove({ _id: req.params.id});
    res.json({status: "200"});
  } catch(e) {
    res.json({message: e});
  }
})

/*
  Conect to Database
*/
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  function () {
    console.log('Connected to DB');
  });

/*
  Listen to the port
*/
app.listen(port);
