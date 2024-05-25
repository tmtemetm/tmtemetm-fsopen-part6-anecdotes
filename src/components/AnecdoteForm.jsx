import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = event => {
    event.preventDefault()
    const input = event.target.content
    dispatch(createAnecdote(input.value))
    dispatch(setNotification(`Anecdote '${input.value}' created`))
    setTimeout(() => dispatch(clearNotification()), 5000)
    input.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
