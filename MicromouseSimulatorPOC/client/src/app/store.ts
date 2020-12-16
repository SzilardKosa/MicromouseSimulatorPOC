import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import listReducer from '../features/list/listSlice'
import editorReducer from '../features/editor/editorSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    list: listReducer,
    editor: editorReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
