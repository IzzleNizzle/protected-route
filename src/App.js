import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute'
import LogIn from "./pages/LogIn"
import Home from "./pages/Home"

export default function App() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={LogIn} />
      <Route path="*" component={() => "404 NOT FOUND"} />
    </Switch>
  );
}
