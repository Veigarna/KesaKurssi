const BlogView = ({ blog }) => {
  console.log('in blogview', blog)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <h4>{blog.content}</h4>
      <a href={blog.url}>{blog.url}</a>
      <p>Likes: {blog.likes} </p>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default BlogView
