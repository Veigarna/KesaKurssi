import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { createAnecdote } from '../request'

import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notifiaction, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      console.log('onnistui add')
    },
    onError: (error) => {
      console.log('virhe lohko')
      ShowNotification('ERROR', error.message)
    },
  })

  //apufunktio viestille, aika 5sek
  const ShowNotification = (type, content) => {
    console.log('in ShowNotification', type, content)

    //asetetaan viesti

    notificationDispatch({ type: type, payload: content })
    setTimeout(() => {
      //clear
      notificationDispatch({ type: 'NULL' })
    }, 5 * 1000)
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
    ShowNotification('ADDED', content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
