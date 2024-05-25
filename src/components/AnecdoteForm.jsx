import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async event => {
    event.preventDefault()

    const input = event.target.content
    const created = await anecdoteService
      .create(input.value)

    dispatch(appendAnecdote(created))

    dispatch(setNotification(`Anecdote '${created.content}' created`))
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
