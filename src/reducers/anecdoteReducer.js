import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    voteAnecdote(state, { payload }) {
      return state.map(anecdote => anecdote.id === payload
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)
        .sort(compare)
    }
  }
})

export const {
  setAnecdotes,
  appendAnecdote,
  voteAnecdote
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
