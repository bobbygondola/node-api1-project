//import express
const express = require('express');
const shortid = require('shortid');

//create a server
const server = express();
server.use(express.json());

//data points
let users = [
    {
        id: shortid.generate(),
        name: "Bobby Gondola",
        bio: "my name is bobby and i love to code"

    }
];


//a function to handle get requests to / endpoint
server.get('/', (req, res) => {
    res.send('hello from the / endpoint in the server')
})

server.get('/users', (req, res) => {
    res.status(200).json(users)
})
server.post('/users', (req, res) => {
    const user = req.body;
    users.push(user)
    res.status(201).json(users)
})
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(u => u.id !== Number(id))
    res.status(200).json(users)
})


//server to listen for incoming requests 
const port = 8001;
server.listen(port, () => console.log(`server is listening on ${port}, good luck and work hard`));