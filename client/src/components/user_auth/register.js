import React from 'react';
import { Mutation } from "react-apollo";
import { REGISTER_USER } from '../../graphql/mutations';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "", 
      password: ""
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.target.value
    })
  };

  updateCache(cache, { data }) {
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    })
    // console.log(data.register.loggedIn)
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        update={(cache, data) => this.updateCache(cache, data)}
      >

        {registerUser => (
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              registerUser({
                variables: {
                  // name: this.state.name,
                  email: this.state.email,
                  password: this.state.password
                }
              })
            }}>

              <input type="text" value={this.state.email} onChange={this.update("email")} placeholder="Email" />
              <input type="password" value={this.state.password} onChange={this.update("password")} placeholder="Password" />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
};

export default Register;