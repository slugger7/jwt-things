import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { serializeError } from 'serialize-error';
import { authenticateUser, verifyUser } from './authentication.js';
import { useCookies } from 'react-cookie';

const LoginPageWrapper = () => {
  const history = useHistory();
  const location = useLocation();
  const [ cookies, setCookie ] = useCookies();

  return (<LoginPage history={history} location={location} cookies={cookies} setCookie={setCookie} />);
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const { location, history, cookies, setCookie } = props;
    
    this.state = {
      errMessage: null,
      from: (location.state || { from: { pathname: '/' }}).from,
      history,
      cookies,
      setCookie,
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
    const { username, password, setCookie, cookies } = this.state;

    this.setState({errMessage: null});

    authenticateUser(username, password)
      .then(token => {
        this.setState({ token });
        setCookie('token', token, { httpOnly: true });
        console.log('The token after setting it', cookies.token);
        this.state.history.replace(this.state.from);
      })
      .catch(err => {
        const errObj = serializeError(err);
        this.setState({ errMessage: errObj.response.body.message });
      })
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

export default LoginPageWrapper;
