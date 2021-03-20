import React, {createContext, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NotMatched from "./components/NotMatched/NotMatched";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Search from "./components/Search/Search";

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/search/:id">
              <Search />
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route  path="*">
              <NotMatched></NotMatched>
            </Route>
          </Switch>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
