import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import LoginPage from './Login';
import ProtectedRoute from './ProtectedRoute';
import AuthButton from './AuthButton';
import SecondProtectedPage from './SecondProtectedPage';

const PublicPage = () => (<h2>Public Page</h2>);
const ProtectedPage = () => (<h2>Protected Page</h2>);

const App = () => (
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
        <p class="level-item">
          <Link to="/second-protected" >Second Protected Page</Link>
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
        <ProtectedRoute path="/second-protected">
          <SecondProtectedPage />
        </ProtectedRoute>
      </Switch>
    </div>
  </Router>
);



export default App;
