//import express
const express = require("express");
// const shortid = require('shortid');

//create a server
const server = express();
server.use(express.json());

//data points
let users = [
  {
    id: 2,
    name: "bruh",
    bio: "my bruh",
  },
];

//new update array dedicated

//a function to handle get requests to / endpoint
server.get("/", (req, res) => {
  res.send("hello from the / endpoint in the server");
});

//get /users
server.get("/users", (req, res) => {
  if ("/users" !== undefined) {
    res.status(200).json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});
//post /users
server.post("/users", (req, res) => {
  const user = req.body;
  if (user.name === undefined || user.bio === undefined) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (user.name !== undefined || user.bio !== undefined) {
    users.push(user);
    res.status(201).json(users);
  } else {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
  }
});

//get /users/:id
server.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const singleUser = users.find((user) => user.id === Number(id));

  if (singleUser) {
    res.status(200).json(singleUser);
  } else {
    res
      .status(404)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

//delete /users/:id
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== Number(id));
  res.status(200).json(users);
});

//put
server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  users = users.filter((user) => user.id != id);
  if (!changes.name || !changes.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    changes.id = id;
    users.push(changes);
    res.status(200).json(users);
  }
});

//server to listen for incoming requests
const port = 8005;
server.listen(port, () =>
  console.log(`hello bobby, i am now sentient.. also on port ${port}`)
);
