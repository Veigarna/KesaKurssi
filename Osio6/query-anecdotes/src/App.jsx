import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { getAnecdotes, updateById } from './request'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADDED':
      {
        const message = `Added: ${action.payload}`
        state = message
      }
      return state
    case 'VOTED':
      {
        const message = `Voted: ${action.payload.content}`
        state = message
      }
      return state
    case 'ERROR':
      {
        const message = `Error: ${action.payload}`
        state = message
      }
      return state
    case 'NULL':
      {
        state = ''
      }
      return state
    default:
      return state
  }
}

const App = () => {
  //tila
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    'Alustus'
  )

  //apufunktio viestille, aika 5sek
  const ShowNotification = (type, content) => {
    console.log('in ShowNotification', type)

    //asetetaan viesti

    notificationDispatch({ type: type, payload: content })
    setTimeout(() => {
      //clear
      notificationDispatch({ type: 'NULL' })
    }, 5 * 1000)
  }

  const queryClient = useQueryClient()

  const voteMutation = useMutation(updateById, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  const handleVote = (anecdote) => {
    console.log('vote', anecdote.id)
    voteMutation.mutate({ id: anecdote.id })
    ShowNotification('VOTED', anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <h3>Anecdote app</h3>

        <Notification message={notification} />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
