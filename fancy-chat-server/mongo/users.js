const { getUsers } = require('./db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const JWTSECRET = process.env.JWT_AUTH_SECRET;

const addUser = ({ email, username, password }, callback) => {
  if (!username || !email || !password || !password.trim().length > 6)
    return callback(403, { message: 'Bad request!' });

  getUsers().then(async users => {
    const existingUsername = await users.findOne({ $or: [{ email }, { username }] });
    if (existingUsername) callback(403, { message: 'Already exists!' });
    else {
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      await users.insertOne({ email, username, password: hash, salt: salt, friends: [] });
      callback(201, { messsage: 'User created successfully!' });
    }
  });
};

const loginUser = ({ username, password }, callback) => {
  getUsers().then(async users => {
    const user = await users.findOne({ username });
    if (!user) return callback(404, { message: 'User not found!' });
    const passwordHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    if (user.password === passwordHash) {
      const token = jwt.sign({ username }, JWTSECRET);
      callback(200, {
        message: 'Signed in...',
        data: {
          username: user.username,
          friends: (user.friends || []),
        }
      }, token);
    } else {
      callback(403, { message: 'Can\'t sign in...' });
    }
  });
}

const addFriend = ({ username, name }, callback) => {
  getUsers().then(async users => {
    const user = await users.findOne({ username });
    const friend = await users.findOne({ username: name });
    if (!friend || !user || username === name) {
      return callback(404, { message: 'Username doesn\'t exist!' });
    }
    if (!user.friends.includes(name)) {
      user.friends.push(name);
    }
    await users.replaceOne({ username }, user);
    callback(200, { message: 'Friend added!' });
  });
}

const getAllFriends = (username, callback) => {
  getUsers().then(async users => {
    const user = await users.findOne({ username });
    callback(200, user.friends);
  });
}

module.exports = { addUser, loginUser, addFriend, getAllFriends };