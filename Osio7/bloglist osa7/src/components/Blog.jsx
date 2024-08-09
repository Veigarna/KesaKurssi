import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

//tyylit
import { Table, Form, Button } from 'react-bootstrap'

const Blog = ({ blog, handleLike, removeClick, currentUser }) => {
  const [view, setView] = useState(false)

  const viewClick = () => {
    console.log('View Clicked')

    if (!view) {
      setView(true)
    }
    if (view) {
      setView(false)
    }
  }

  const addLike = (event) => {
    event.preventDefault()
    handleLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user,
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteClick = (event) => {
    event.preventDefault()
    removeClick({
      id: blog.id,
    })
  }

  if (!view) {
    return (
      <div style={blogStyle} placeholder="blogBox">
        <Link
          to={`/blogs/${blog.id}`}
          data-testid="blog-title"
          style={{ fontSize: 25 }}
        >
          {blog.title}
        </Link>
        <p data-testid="blog-author" style={{ fontSize: 15 }}>
          {blog.author}
        </p>
        <Button
          data-testid="view-click"
          variant="secondary"
          onClick={viewClick}
        >
          View
        </Button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <p data-testid="blog-title">{blog.title}</p> <br></br>{' '}
        <p data-testid="blog-author">{blog.author}</p>
        <br></br>
        <p data-testid="blog-url">{blog.url}</p> <br></br>
        <p data-testid="blog-likes">{blog.likes}</p>
        <Button variant="success" data-testid="like-click" onClick={addLike}>
          Like
        </Button>
        <br></br>
        {blog.user.username === currentUser.username && (
          <>
            <button data-testid="remove-click" onClick={deleteClick}>
              Remove
            </button>
            <br></br>
          </>
        )}
        <br></br>
        <Button
          variant="secondary"
          data-testid="hide-click"
          onClick={viewClick}
        >
          Hide
        </Button>
      </div>
    )
  }
}

export default Blog
