import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (input) => {
  const object = { content: input, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateById = async (id) => {
  const responsedata = await axios.get(baseUrl + '/' + id)
  const anecdoteToChange = responsedata.data
  console.log('joka meinataan updatee', anecdoteToChange)
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  }
  console.log('muutettu', changedAnecdote)
  const response = await axios.put(baseUrl + '/' + id, changedAnecdote)
  return response.data
}
export default { getAll, createNew, updateById }
