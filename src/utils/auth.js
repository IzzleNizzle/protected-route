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

  // For this particular API, tokens expire after 7 days. 
  // Check to see if we are within 1 day of token expiring. If so, renew token
  checkRefresh() {
    if (this.timeStamp.getDate() === new Date().getDate()) {
      this.refreshToken()
    }
    else {
      console.log("Token is valid still, no need to refresh");
    }
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
        this.token = response.data.token;
        this.authenticated = true;
        this.timeStamp = this.returnTimeStamp(response.data.token)
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