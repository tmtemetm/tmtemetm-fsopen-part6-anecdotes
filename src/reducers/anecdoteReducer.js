import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, { payload }) {
      state.push(asObject(payload))
    },
    voteAnecdote(state, { payload }) {
      return state.map(anecdote => anecdote.id === payload
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote)
        .sort((a1, a2) => a2.votes - a1.votes)
    },
    setAnecdotes(state, { payload }) {
      return payload
    }
  }
})

export const {
  createAnecdote,
  voteAnecdote,
  setAnecdotes
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
