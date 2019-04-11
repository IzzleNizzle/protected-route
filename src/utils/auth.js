import axios from 'axios'
import jwtDecode from 'jwt-decode';

class Auth {
  constructor() {
    this.authenticated = false;
    this.token = '';
    this.timeStamp = '';
  }

  signUp(cred) {
    axios.post('https://altamir-generator-api.herokuapp.com/auth/register', cred)
      .then(function (response) {
        console.log("signup success");
        console.log(response);
      })
      .catch(function (error) {
        console.log("signup Failed");
        console.log(error);
      });
  }


  logIn(cred, cb) {
    axios.post('https://altamir-generator-api.herokuapp.com/auth/login', cred)
      .then((response) => {
        console.log("login success");
        console.log(response);
        this.token = response.data.token;
        this.authenticated = true;
        this.timeStamp = this.returnTimeStamp(response.data.token)
        cb();
      })
      .catch((error) => {
        this.authenticated = false;
        console.log("login Failed");
        console.log(error);
      });
  }

  refreshToken() {
    axios.post('https://altamir-generator-api.herokuapp.com/auth/refresh', {},
      {
        headers: {
          "Authorization": `Bearer ${this.token}`
        }
      })
      .then((response) => {
        console.log("refresh success");
        console.log(response);
      })
      .catch((error) => {
        this.authenticated = false;
        console.log("refresh Failed");
        console.log(error);
      });
  }

  isAuthenticated() {
    return this.authenticated;
  }

  // Decode JWT token and return converted Unix time
  returnTimeStamp(token) {
    let decoded = jwtDecode(token)
    return new Date(decoded.exp * 1000)
  }
}

export default new Auth();