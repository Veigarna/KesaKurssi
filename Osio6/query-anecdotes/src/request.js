import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = async (newAnecdote) => {
  console.log('axios.post', newAnecdote)
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const updateById = async ({ id }) => {
  console.log('in request', id)
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
