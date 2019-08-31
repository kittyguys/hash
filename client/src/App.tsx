import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup/Signup";
import SignupConfirm from "./pages/Signup/SignupConfirm";
import Signin from "./pages/Signin/Signin";

const App: React.FC = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/signup/confirm" component={SignupConfirm} />
    <Route exact path="/signin" component={Signin} />
  </Router>
);

export default App;
