import { useDispatch } from 'react-redux'
import { addAnecdotes } from '../reducers/anecdoteReducer'
//ilmotus
import { setNotification } from '../reducers/notificationReducer'

//import anecdoteService from '../services/anecdote'

const Anecdoteform = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('adding', content)
    //menee reducer metodii
    try {
      dispatch(addAnecdotes(content))
      //ilmotus
      dispatch(setNotification(`Created new anecdote: '${content}'`, 5))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={addNewAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />

        <button type="submit">create</button>
      </div>
    </form>
  )
}
export default Anecdoteform
