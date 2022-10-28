import { config } from '../config';

export default (function () {
  return {
    isLoggedIn() {
      const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      if (isLoggedIn === true) return true;
      else return false;
    },
    setIsLoggedIn(bool) {
      localStorage.setItem('isLoggedIn', bool);
    },
    getUsername() {
      return localStorage.getItem('username');
    },
    setUsername(username) {
      localStorage.setItem('username', username);
    },
    setToken(token) {
      localStorage.setItem('token', token);
    },
    getToken() {
      return localStorage.getItem('token');
    },
    async login(username, password) {
      const response = await fetch(`${config.fullAddress()}/api/user/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { 'content-type': 'application/json' },
      });
      this.setUsername(username);
      this.setIsLoggedIn(true);
      this.setToken((await response.json()).token);
      if (response.status !== 200) {
        throw Error((await response.json()))
      }
    },
    async signup(email, username, password) {
      const response = await fetch(`${config.fullAddress()}/api/user/create`, {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
        headers: { 'content-type': 'application/json' },
      });
      if (response.status !== 201) {
        throw Error((await response.json()))
      }
    },
    async addFriend(friendName) {
      const response = await fetch(`${config.fullAddress()}/api/protected/friends`, {
        method: "POST",
        body: JSON.stringify({ name: friendName }),
        headers: {
          'content-type': 'application/json',
          'auth-token': this.getToken(),
        },
      });
      if (response.status !== 200) {
        throw Error((await response.json()))
      }
    },
    async fetchAllFriends() {
      const response = await fetch(`${config.fullAddress()}/api/protected/friends/all`, {
        method: "POST",
        headers: {
          'auth-token': this.getToken(),
        }
      });
      if (response.status !== 200) {
        throw Error((await response.json()))
      }
      return await response.json();
    },
    logout() {
      this.setIsLoggedIn(false);
      this.setToken('');
      this.setUsername('');
    }
  }
})();