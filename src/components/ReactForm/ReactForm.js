import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import auth from "../../utils/auth"

export default withRouter(function ReactForm({ history }) {
  // Handling user input here
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
  });
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  // Function calls for authenticating
  const signUp = () => {
    auth.signUp(userInput)
  };

  const logIn = () => {
    // Call log in function, if successful callback will fire and will be routed to protected route
    auth.logIn(userInput, () => {
      history.push("/");
    })
  };

  return (
    <>
      <h4>Sign up and Log in</h4>

      <label>
        <strong>Email</strong>
      </label>
      <input
        type="text"
        value={userInput["email"]}
        name="email"
        onChange={handleInputChange}
      />

      <label>
        <strong>Password</strong>
      </label>
      <input
        type="password"
        value={userInput["password"]}
        name="password"
        onChange={handleInputChange}
      />

      <button onClick={signUp}>
        Sign up
      </button>

      <button onClick={logIn}>
        Log in
      </button>
    </>
  );
})
