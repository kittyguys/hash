import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import UserList from "./pages/UserList";

const App: React.FC = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/signup" component={Signup} />
    {/* <Route exact path="/signin" component={Signin} /> */}
    <Route exact path="/userlist" component={UserList} />
  </Router>
);

export default App;
