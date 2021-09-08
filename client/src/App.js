import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SignIn, SignUp, Dashboard } from "./Pages";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}
