import { useState, useEffect, useRef } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

import { setUser } from '../reducers/userReducer'

//tyylit
import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')

      //messaget
      dispatch(setNotification(`Logged in: ${user.username}`, 5))
    } catch (exception) {
      //messaget error
      dispatch(setNotification('Wrong gredentials'))
    }
  }

  return (
    <div className="container">
      <Form onSubmit={handleLogin} placeholder="LoginForm">
        <h2>LogIn</h2>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            placeholder="usernameInput"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            placeholder="passwordInput"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="info" type="submit" style={{ marginTop: '10px' }}>
          login
        </Button>
      </Form>
    </div>
  )
}
export default LoginForm
