import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

export default ({ children, ...rest }) => (
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

