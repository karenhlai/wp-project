import React from 'react';
import { Mutation } from "react-apollo";
import { LOGIN_USER } from '../../graphql/mutations';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "", 
      password: ""
    };
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    });
  };

  //update Mutation prop => to update isLoggedIn value in the cache 
  updateCache(cache, { data } ) {
    cache.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    })
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => { //onCompleted:	A callback executed once your mutation successfully completes
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        //this runs upon mutation success 
        update={(cache, data) => this.updateCache(cache, data)}
      >
      
        {loginUser => (
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              loginUser({
                variables: {
                  email: this.state.email,
                  password: this.state.password
                }
              });
            }}>

              <input type="text" value={this.state.email} onChange={this.update("email")} placeholder="Email" />
              <input type="password" value={this.state.password} onChange={this.update("password")} placeholder="Password" />
              <button type="submit">Log In</button>
            </form>
          </div>
        )}

      </Mutation>
    )
  }
};

export default Login;