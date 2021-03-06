import React from 'react';
import AuthService from '../../../services/AuthService';
import Hero from '../../layout/Hero';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();

    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state).then(
      user => {
        setUser(user);
        // todo This should redirect me to the admin panel
        history.push(`/panel/${user.username}`);
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { username, password } = this.state;
    return (
      <section className='section auth-section landing'>
        <div className='container columns'>
          <div className='column is-one-third'>
            <Hero></Hero>
          </div>

          <div className='column is-two-third form-container'>
            <h3 className='title'>Signup</h3>
            <form onSubmit={this.handleFormSubmit}>
              <div className='field'>
                <label className='label' htmlFor='username'>
                  Username:
                </label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={this.handleChange}
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div className='field'>
                <label htmlFor='password' className='label'>
                  Password:
                </label>
                <div className='control'>
                  <input
                    className='input'
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className='control'>
                <input
                  type='submit'
                  className='button is-link'
                  value='Create account'
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
