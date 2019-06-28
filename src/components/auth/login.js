import superagent from "superagent";
import React, { useContext, useState } from "react";
import { LoginContext } from "./context.js";

const API = process.env.REACT_APP_API;

const If = props => {
  return !!props.condition ? props.children : null;
};

export default function Login() {
  const context = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e, loginMethodFromContext) => {
    e.preventDefault();
    console.log(username, password);
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then(response => {
        let token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  };

  return (
    <>
      <If condition={context.loggedIn}>
        <button onClick={context.logout}>Log Out</button>
      </If>
      <If condition={!context.loggedIn}>
        <div>
          <form onSubmit={event => handleSubmit(event, context.login)}>
            <input
              placeholder="username"
              name="Username"
              onChange={event => setUsername(event.target.value)}
            />
            <input
              placeholder="password"
              name="Password"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />
            <input type="submit" value="login" />
          </form>
        </div>
      </If>
    </>
  );
}
