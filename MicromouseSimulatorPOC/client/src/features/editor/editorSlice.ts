/**
 * stores: result, program, editor state
 * GET program by id (save loading state, and error)
 * UPDATE program by id
 * RUN prgram by id
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import Program from '../../models/ProgramModel'
import Result from '../../models/ResultModel'

interface EditorState {
  program: Program | null
  loadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  loadingError: any
  result: Result | null
  runStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  runError: any
  fontSize: number
  theme: string
}

const initialState: EditorState = {
  program: null,
  loadingStatus: 'idle',
  loadingError: null,
  result: null,
  runStatus: 'idle',
  runError: null,
  fontSize: 14,
  theme: 'monokai'
}

export const fetchProgram = createAsyncThunk('editor/fetchProgram', async (programId: string) => {
  const response = await axios.get(`/user-code/${programId}`)
  return response.data as Program
})

export const updateProgram = createAsyncThunk('editor/updateProgram', async (program: Program) => {
  const response = await axios.put(`/user-code/${program.id}`, program)
  return response.data as Program
})

export const runProgram = createAsyncThunk('editor/runProgram', async (programId: string) => {
  const response = await axios.get(`/user-code/${programId}/result`)
  return response.data as Result
})

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateName(state, action) {
      if (state.program) {
        const newName = action.payload
        state.program.name = newName
      }
    },
    updateCode(state, action) {
      if (state.program) {
        const newCode = action.payload
        state.program.codeText = newCode
      }
    },
    updateFontSize(state, action) {
      const newFontSize = action.payload
      state.fontSize = newFontSize
    },
    updateTheme(state, action) {
      const newTheme = action.payload
      state.theme = newTheme
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProgram.pending, (state, action) => {
      state.loadingStatus = 'loading'
      state.result = null
    })
    builder.addCase(fetchProgram.fulfilled, (state, action) => {
      state.loadingStatus = 'succeeded'
      state.program = action.payload
    })
    builder.addCase(fetchProgram.rejected, (state, action) => {
      state.loadingStatus = 'failed'
      state.loadingError = action.payload
    })
    builder.addCase(updateProgram.fulfilled, (state, action) => {
      //state.program = action.payload
    })
    builder.addCase(runProgram.pending, (state, action) => {
      state.runStatus = 'loading'
    })
    builder.addCase(runProgram.fulfilled, (state, action) => {
      state.runStatus = 'succeeded'
      state.result = action.payload
    })
    builder.addCase(runProgram.rejected, (state, action) => {
      state.runStatus = 'failed'
      state.runError = action.payload
    })
  }
})

export default editorSlice.reducer

export const { updateName, updateCode, updateFontSize, updateTheme } = editorSlice.actions

export const selectProgram = (state: RootState) => state.editor.program
export const selectResult = (state: RootState) => state.editor.result
