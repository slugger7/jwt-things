import React from 'react';
import { withRouter } from 'react-router-dom';
import { serializeError } from 'serialize-error';
import { authenticateUser, handleNewToken } from './authentication.js';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const { location, history } = props;

    this.state = {
      errMessage: null,
      from: (location.state || { from: { pathname: '/' }}).from,
      history,
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    this.setState({errMessage: null});

    authenticateUser(username, password)
      .then(handleNewToken)
      .then(() => this.state.history.replace(this.state.from))
      .catch(err => {
        console.log('We encountered an error', err);
        const errObj = serializeError(err);
        this.setState({ errMessage: errObj.response.body.message });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <p>You must log in to view the page at {this.state.from.pathname}</p>
        {this.state.errMessage && (<p>{this.state.errMessage}</p>)}
        <form onSubmit={this.handleSubmit}>
        <div class="field">
        <label class="label">Username:</label>
        <input class="input" type="text" value={this.state.username} name="username" onChange={this.handleChange} />
        </div>
        <div class="field">
        <label class="label">Password:</label>
        <input class="input" type="password" value={this.state.password} name="password" onChange={this.handleChange} />
        </div>
        <input class="button is-link" type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default withRouter(LoginPage);
