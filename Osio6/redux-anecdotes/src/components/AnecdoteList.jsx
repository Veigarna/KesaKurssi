import { useSelector, useDispatch } from 'react-redux'
import { insertLikes } from '../reducers/anecdoteReducer'
//ilmotus
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log('filter', filter)
    console.log('anecdotes', anecdotes)
    if (filter != null) {
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.includes(filter)
      )
      return filteredAnecdotes
    }

    return anecdotes
  })

  console.log(anecdotes)

  const vote = (id, content) => {
    console.log('vote', id)
    //menee reducer metodii
    dispatch(insertLikes(id))
    //ilmotus
    dispatch(setNotification(`Liked anecdote: '${content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AnecdoteList
