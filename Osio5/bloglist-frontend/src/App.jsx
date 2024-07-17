import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ShowAddBlog from './components/AddBlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const [user, setUser] = useState(null)

  // Hakee blogit aina, kun user muuttuu
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (user) {
          const blogs = await blogService.getAll()
          blogs.sort((a, b) => b.likes - a.likes)
          setBlogs(blogs)
        }
      } catch (error) {
        console.log('Ei pysty hakee listaa', error)
      }
    }

    fetchBlogs()
  }, [user])

  // onko käyttäjä jo kirjautunut
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      //messaget
      setErrorMessage('Logged in successfully')
      setMessageType('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      //messaget
      setErrorMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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
      setBlogs((prevBlogs) => {
        const updatedBlogs = prevBlogs.concat({
          ...addedBlog,
          user: {
            username: user.username,
            name: user.name,
            id: user.id,
          },
        })
        updatedBlogs.sort((a, b) => b.likes - a.likes)
        return updatedBlogs
      })
      //messaget
      setErrorMessage('Blog added')
      setMessageType('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Error adding blog:', error)
    }
  }

  const logoutClick = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
    console.log('User logout', user)

    //messaget
    setErrorMessage('User logged out')
    setMessageType('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const showLogIn = () => (
    <form onSubmit={handleLogin} placeholder="LoginForm">
      <div>
        username
        <input
          placeholder="usernameInput"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          placeholder="passwordInput"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLike = async (upbatingBlog) => {
    console.log('handleLike: entinen', upbatingBlog)
    const content = {
      id: upbatingBlog.id,
      title: upbatingBlog.title,
      author: upbatingBlog.author,
      url: upbatingBlog.url,
      likes: upbatingBlog.likes + 1,
      user: upbatingBlog.user.id,
    }
    console.log('uusi', content)

    try {
      await blogService.putBlog(content)
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      setUser(user)
      //messaget
      setErrorMessage('Blog liked!')
      setMessageType('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const handleDelete = async (deletingBlog) => {
    console.log('handleDelete: ', deletingBlog)

    const userConfirmed = window.confirm(
      'Oletko varma, että haluat poistaa tämän?'
    )

    if (userConfirmed) {
      await blogService.deleteBlog(deletingBlog)
      console.log('Removed')
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    } else {
      console.log('Cancel')
    }
  }

  //ei kirjautunut
  if (user === null) {
    return (
      <div>
        <h1>Blogi sovellus</h1>
        <Notification message={errorMessage} type={messageType} />
        {showLogIn()}
      </div>
    )
  }
  //kirjautunut
  return (
    <div>
      <h1>Blogi sovellus</h1>
      <h2>Logged in {user.username}</h2>

      <button onClick={logoutClick}>Log out</button>
      <Notification message={errorMessage} type={messageType} />
      <Togglable buttonLabel="Add Blog" ref={noteFormRef}>
        <ShowAddBlog handleAdd={handleAdd} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          removeClick={handleDelete}
          currentUser={user}
        />
      ))}
    </div>
  )
}

export default App
