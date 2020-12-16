/**
 * stores: list of programs, loading, error
 * GET all programs (save loading state, and error)
 * POST new program
 * DELETE program by id
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import Program from '../../models/ProgramModel'

interface ListState {
  programs: Program[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: any
}

const initialState: ListState = {
  programs: [],
  status: 'idle',
  error: null
}

export const fetchPrograms = createAsyncThunk('list/fetchPrograms', async () => {
  const response = await axios.get('/user-code')
  return response.data as Program[]
})

export const addNewProgram = createAsyncThunk('list/addNewProgram', async (newProgram: Program) => {
  const response = await axios.post('/user-code', newProgram)
  return response.data as Program
})

export const deleteProgram = createAsyncThunk('list/deleteProgram', async (programId: string) => {
  const response = await axios.delete(`/user-code/${programId}`)
  console.log(response)
  // return response.data.id as string
  return programId
})

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPrograms.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPrograms.fulfilled, (state, action) => {
      state.status = 'succeeded'
      // Add any fetched programs to the array
      state.programs = state.programs.concat(action.payload)
    })
    builder.addCase(fetchPrograms.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
    builder.addCase(addNewProgram.fulfilled, (state, action) => {
      state.programs.push(action.payload)
    })
    builder.addCase(deleteProgram.fulfilled, (state, action) => {
      const id = action.payload
      const index = state.programs.findIndex(program => program.id === id)
      state.programs.splice(index, 1)
    })
  }
})

export default listSlice.reducer

export const selectAllPrograms = (state: RootState) => state.list.programs
