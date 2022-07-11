require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { addUser, loginUser, addFriend, getAllFriends } = require('./mongo/users');
const { ExpressPeerServer } = require('peer');

const app = express();
const port = process.env.PORT || 3131;

const JWTSECRET = process.env.JWT_AUTH_SECRET;

app.use(express.json());
app.use(cors());

app.use("/api/protected", (req, res, next) => {
  if (req.headers['auth-token']) {
    try {
      const decoded = jwt.verify(req.headers['auth-token'], JWTSECRET);
      req.username = decoded.username;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
});

app.post("/api/user/create", (req, res) => {
  addUser(req.body, (status, response) => {
    res.status(status).json(response);
  });
});

app.post("/api/user/login", (req, res) => {
  loginUser(req.body, (status, response, token) => {
    if (token) {
      res
        .status(status)
        .json({ ...response, token });
    } else {
      res.status(status).json(response);
    }
  });
});

app.post("/api/protected/friends", (req, res) => {
  addFriend({
    username: req.username,
    name: req.body.name
  }, (status, response) => {
    res.status(status).json(response);
  });
});

app.post("/api/protected/friends/all", (req, res) => {
  getAllFriends(req.username, (status, response) => {
    res.status(status).json({ friends: response });
  });
});

const server = app.listen(port, () => {
  console.log(`app listening to port ${port}...`);
})

const peerServer = ExpressPeerServer(server, {
  path: '/p2p/call',
});

app.use(peerServer);