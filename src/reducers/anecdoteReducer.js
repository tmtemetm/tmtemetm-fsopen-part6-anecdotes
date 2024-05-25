import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { clearNotification, setNotification } from './notificationReducer'

const compare = (a1, a2) => a2.votes - a1.votes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, { payload }) {
      return [...payload]
        .sort(compare)
    },
    appendAnecdote(state, { payload }) {
      state.push(payload)
    },
    replaceAnecdote(state, { payload }) {
      return state.map(anecdote =>
        anecdote.id === payload.id ? payload : anecdote)
        .sort(compare)
    }
  }
})

export const {
  setAnecdotes,
  appendAnecdote,
  replaceAnecdote
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const created = await anecdoteService.create(content)
    dispatch(appendAnecdote(created))
    dispatch(setNotification(`Anecdote '${created.content}' created`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updated = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(replaceAnecdote(updated))
    dispatch(setNotification(`You voted '${updated.content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export default anecdoteSlice.reducer
