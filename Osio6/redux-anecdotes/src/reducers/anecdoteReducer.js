import { createSlice } from '@reduxjs/toolkit'
/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]*/

//const getId = () => (100000 * Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}*/
const sortList = (list) => {
  return list.sort((a, b) => b.votes - a.votes)
}

//const initialState = anecdotesAtStart.map(asObject)

/*const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIKE': {
      const id = action.data
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      //korvaa lsitan uudella, jos id sama -> korvaa uudella jossa liket +1
      const newList = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      //votejen mukaan
      const filteretList = sortList(newList)
      console.log(filteretList)

      return filteretList
    }
    case 'ADD_ANECDOTE':
      {
        console.log(action.data)
      }
      return [...state, action.data]
    default:
      return state
  }
}*/

/*export const addLike = (id) => {
  return {
    type: 'ADD_LIKE',
    data: id,
  }
}*/

/*export const addAnecdote = (userInput) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content: userInput,
      id: getId(),
      votes: 0,
    },
  }
}*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      console.log('reducer sisällä payload', action.payload)
      const id = action.payload.id
      const changedAnecdote = state.find((anecdote) => anecdote.id === id)
      console.log('reducer sisällä state', state)
      console.log('reducer sisällä etsitty', changedAnecdote)
      //korvaa listan uudella, jos id sama -> korvaa uudella
      const newList = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload
      )
      //votejen mukaan
      const filteretList = sortList(newList)
      console.log('reducer sisällä ennen palautusta', filteretList)

      return filteretList
    },
    setAnecdotes(state, action) {
      sortList(action.payload)
      return action.payload
    },
  },
})

export const { addAnecdote, addLike, setAnecdotes } = anecdoteSlice.actions

import anecdoteService from '../services/anecdote'
export const getAnecdotes = () => {
  return async (dispatch) => {
    const list = await anecdoteService.getAll()
    dispatch(setAnecdotes(list))
  }
}

export const addAnecdotes = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(createdAnecdote))
  }
}

export const insertLikes = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateById(id)
    dispatch(addLike(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
