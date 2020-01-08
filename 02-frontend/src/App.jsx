import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';
import LoginPage from './Login';

const fakeAuth = {
  isAuthenticated: false,
  signOut(callback) {
    fakeAuth.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const AuthButton = () => {
  const history = useHistory;

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button onClick={() => fakeAuth.signOut(() => history.push('/'))}>Sign Out</button>
    </p>
  ) : (
    <p>You are not logged in</p>
  );
};

const ProtectedRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) =>
        fakeAuth.isAuthenticated ?
          (children) :
          <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
              />
          }
          />
);

const PublicPage = () => (<h2>Public Page</h2>);
const ProtectedPage = () => (<h2>Protected Page</h2>);

const App = () => {
  return (
  <Router>
    <div class="container">
      <AuthButton />

      <nav class="level">
        <p class="level-item">
          <Link to="/public">Public Page</Link>
        </p>
        <p class="level-item">
          <Link to="/protected">Protected Page</Link>
        </p>
      </nav>

      <Switch>
        <Route path="/public">
          <PublicPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/protected">
          <ProtectedPage />
        </ProtectedRoute>
      </Switch>
    </div>
  </Router>
)};



export default App;
