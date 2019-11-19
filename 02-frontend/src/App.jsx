import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback) {
    fakeAuth.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    fakeAuth.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

const AuthButton = () => {
  let history = useHistory();

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
      ({location}) =>
p        fakeAuth.isAuthenticated ?
          (children) :
          <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
              />
          }
          />
);

const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: '/'}};
  let login = () => {
    fakeAuth.authenticate(() => history.replace(from));
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}

const PublicPage = () => (<h2>Public Page</h2>);
const ProtectedPage = () => (<h2>Protected Page</h2>);

const App = () => (
  <Router>
    <div>
      <AuthButton />

      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

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
);



export default App;
