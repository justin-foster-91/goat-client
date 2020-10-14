import React, {Component} from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import {Input, Button} from '../Utils/Utils';
import './LoginForm.css'

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  state = {error: null};

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({error: null});
    const {user_name, password} = ev.target;
    // TODO Change to use the usercontext.
    AuthApiService.postLogin({
      username: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken); // TODO Change depending on actual server response.
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({error: res.error});
      });
  };

  render() {
    const {error} = this.state;
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <form className='LoginForm'
          onSubmit={this.handleSubmitJwtAuth}
        >
          <div className='user_name'>
            <label htmlFor='LoginForm__user_name'>
              User name:
            </label>
            <Input
              name='user_name'
              required
              id='LoginForm__user_name'
            />
          </div>
          <div className='password'>
            <label htmlFor='LoginForm__password'>
              Password:
            </label>
            <Input
              name='password'
              type='password'
              required
              id='LoginForm__password'
            />
          </div>
          <Button type='submit'>
            Login
          </Button>
        </form>
      </>
    );
  };
};