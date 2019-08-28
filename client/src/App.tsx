import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./pages/Home";

const App: React.FC = () => (
  <Router>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/signup" component={SignUp} /> */}
    {/* <Route exact path="/login" component={Login} /> */}
  </Router>
);

export default App;
