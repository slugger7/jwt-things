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

const AuthButton = () => {
  const history = useHistory();
  const token = window.localStorage.getItem('token');

  const signOut = () => {
    window.localStorage.clear();
    history.push('/');
  }

  return token ? (
    <p>
      <span>Welcome {window.localStorage.getItem('username')} </span>
      <button onClick={signOut}>Sign out</button>
    </p>
  ) : (
    <p>You are not signed in</p>
  );
};

const ProtectedRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) =>
        localStorage.getItem('token') ?
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
