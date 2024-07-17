const blogsRouter = require('express').Router()
//const jwt = require('jsonwebtoken');
const Blog = require('../models/blog')
//const User = require('../models/user');
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', userExtractor, async (request, response) => {
  console.log('someone getting them all')
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const addedBlog = await blog.save()
  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()
  response.status(201).json(addedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  console.log('someone trying put')
  const body = request.body
  const user = request.user

  console.log('put content user', user)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  }
  console.log('Input', blog)
  console.log(request.params.id)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  console.log('someone trying delete')

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
