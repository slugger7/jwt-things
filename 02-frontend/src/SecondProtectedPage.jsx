import React from 'react';
import { api } from './api';

class SecondProtectedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: false,
      verified: false
    }
  }

  componentDidMount() {
    this.setState({ busy: true });
    api(
      req => req.get('verify')
    ).then((decodedToken) => {
      this.setState({ busy: false, verified: true });
    }).catch(err => {
      this.setState({ busy: false, verified: false });
    })
  }

  render() {
    return (<div>
      {this.state.busy && <span>spinner goes here</span>}
    {!this.state.busy && this.state.verified && <span>Verified</span>}
    {!this.state.busy && !this.state.verified && <span>Not Verified</span>}
     </div>)
  }
};

export default SecondProtectedPage;
