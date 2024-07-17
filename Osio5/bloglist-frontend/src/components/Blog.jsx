import { useState } from 'react'
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
        <p data-testid="blog-title">{blog.title}</p>
        <p data-testid="blog-author">{blog.author}</p>
        <button data-testid="view-click" onClick={viewClick}>
          View
        </button>
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
        <button data-testid="like-click" onClick={addLike}>
          Like
        </button>
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
        <button data-testid="hide-click" onClick={viewClick}>
          Hide
        </button>
      </div>
    )
  }
}

export default Blog
