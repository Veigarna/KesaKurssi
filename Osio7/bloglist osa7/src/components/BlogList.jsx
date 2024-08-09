import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

import { useSelector } from 'react-redux'

import { setBlogs } from '../reducers/blogsReducer'

const BlogList = () => {
  //user haku
  const user = useSelector(({ user }) => {
    return user
  })

  //blogs lista haku tilasta
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const dispatch = useDispatch()
  // Hakee blogit aina, kun user muuttuu
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (user) {
          const blogs = await blogService.getAll()
          blogs.sort((a, b) => b.likes - a.likes)
          dispatch(setBlogs(blogs))
          console.log('Lista testi', blogs)
        }
      } catch (error) {
        console.log('Ei pysty hakee listaa', error)
      }
    }

    fetchBlogs()
  }, [user])

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
      dispatch(setBlogs(blogs))
      dispatch(setNotification('Blog liked!'))
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
      dispatch(setBlogs(blogs))
    } else {
      console.log('Cancel')
    }
  }

  return (
    <div>
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

export default BlogList
