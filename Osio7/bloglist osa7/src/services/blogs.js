import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const getAll = async () => {
  console.log('hakee blogit')

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const postBlog = async (content) => {
  console.log('lisää blogin')

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, content, config)

  return response.data
}

const putBlog = async (content) => {
  console.log('likettää blogin', content)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(baseUrl + '/' + content.id, content, config)

  console.log('putBlog', response)
  return response.data
}

const deleteBlog = async (content) => {
  console.log('poistaa blogin')

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(baseUrl + '/' + content.id, config)

  return response.data
}

export default { getAll, setToken, postBlog, putBlog, deleteBlog }
