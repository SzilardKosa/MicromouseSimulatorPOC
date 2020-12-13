/**
 * sotres
 * GET all programs (save loading state, and error)
 * POST new program
 * DELETE program by id
 */
import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
  name: 'list',
  initialState: {},
  reducers: {}
})

export default listSlice.reducer
