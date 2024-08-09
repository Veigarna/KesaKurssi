import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import Notification from './components/Notification'
import ShowAddBlog from './components/AddBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Bloglist from './components/BlogList'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import { useSelector } from 'react-redux'

import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogsReducer'

import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import axios from 'axios'
import BlogView from './components/BlogView'

//tyylit
import { Table, Navbar, Nav, Button } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <Navbar expand="lg" style={{ backgroundColor: '' }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" style={{ fontWeight: 'bold' }}>
            BlogList
          </Nav.Link>
          <Nav.Link as={Link} to="/users" style={{ fontWeight: 'bold' }}>
            Users
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const UsersView = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    try {
      const getUserList = async () => {
        const userList = await axios.get('/api/users')

        console.log('data', userList.data)

        setUsers(userList.data)
      }
      getUserList()
      //console.log(' User lista ', users)
    } catch (error) {
      console.log(' Users lista haku virhe ', error)
    }
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <Table bordered>
        <tr>
          <th>Users</th>
          <th>Blogs</th>
        </tr>

        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length} </td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

const User = ({ userId }) => {
  const [user, setUser] = useState([])

  useEffect(() => {
    try {
      const getUser = async () => {
        const userList = await axios.get('/api/users')

        console.log('data', userList.data)

        const findUser = userList.data.find((user) => user.id === userId)

        setUser(findUser)
      }
      getUser()
      //console.log(' User lista ', users)
    } catch (error) {
      console.log(' User virhe ', error)
    }
  }, [])

  console.log('user view', userId, user.blogs)

  if (!user) {
    return (
      <div>
        <p>No blogs available.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.username}</p>
      <div>
        {user.blogs && user.blogs.length > 0 ? (
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  )
}

const App = () => {
  //const [blogs, setBlogs] = useState([])

  //user haku
  const user = useSelector(({ user }) => {
    return user
  })

  //blogs lista haku tilasta
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  console.log('user:', user)

  const dispatch = useDispatch()

  // onko käyttäjä jo kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const handleAdd = async (newBlog) => {
    console.log('handleAdd')
    noteFormRef.current.toggleVisibility()
    const content = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0,
      user: user,
    }
    console.log(content)

    try {
      const addedBlog = await blogService.postBlog(content)

      console.log('added blog in handleadd', addedBlog)

      const updatedBlogs = (prevBlogs) => {
        const updatedList = prevBlogs.concat({
          ...addedBlog,
          user: {
            username: user.username,
            name: user.name,
            id: user.id,
          },
        })
        updatedList.sort((a, b) => b.likes - a.likes)
        return updatedList
      }

      dispatch((dispatch, getState) => {
        const prevBlogs = getState().blogs
        const newBlogs = updatedBlogs(prevBlogs)

        dispatch(setBlogs(newBlogs))
        dispatch(setNotification('Blog Added'))
      })
    } catch (error) {
      dispatch(setNotification('Error adding blog'))
    }
  }

  const logoutClick = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
    blogService.setToken(null)
    console.log('User logout', user)

    //messaget
    dispatch(setNotification('User logged out'))
  }

  const matchUser = useMatch('/users/:id')
  const id = matchUser ? matchUser.params.id : null

  const matchBlog = useMatch('/blogs/:id')
  console.log('id ', matchBlog)
  const selectedBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  //ei kirjautunut
  if (user === null) {
    return (
      <>
        <div>
          <Notification />
          <LoginForm></LoginForm>
        </div>
      </>
    )
  }
  //kirjautunut

  if (user !== null) {
    return (
      <body style={{ backgroundColor: '#A9E190' }}>
        <div className="container" style={{ backgroundColor: '#DBF4AD' }}>
          <Notification />
          <h1>Blogi sovellus</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ marginRight: '10px', fontSize: 20 }}>
              Logged in {user.username}
            </h2>
            <Button variant="dark" onClick={logoutClick}>
              Log out
            </Button>
          </div>

          <Menu></Menu>

          <Togglable buttonLabel="Add Blog" ref={noteFormRef}>
            <ShowAddBlog handleAdd={handleAdd} />
          </Togglable>

          <Routes>
            <Route path="/" element={<Bloglist />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/users/:id" element={<User userId={id} />} />
            <Route
              path="/blogs/:id"
              element={<BlogView blog={selectedBlog} />}
            />
          </Routes>
        </div>
      </body>
    )
  }
}

export default App
