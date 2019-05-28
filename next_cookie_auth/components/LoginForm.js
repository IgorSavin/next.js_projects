import { loginUser } from '../lib/auth'

class LoginForm extends React.Component {
  state = {
    email: 'Lucio_Hettinger@annie.ca',
    password:'demarco.info'
  }

  handleChange = event =>{
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    const { email, password } = this.state;

    event.preventDefault();
    loginUser(email, password)
  }


  render() {
    const { email, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div><input type="email"
        name="email"
        placeholder="email"
        value={email}
        onChange={this.handleChange}
        /></div>
        <div><input type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={this.handleChange}
        /></div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default LoginForm;