import React from 'react';
import './css/tailwind.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <AuthProvider>
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
    </AuthProvider>
  );
}

export default App;
