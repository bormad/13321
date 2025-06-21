import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import contractsSlice from "./slices/contractsSlice"
import studentsSlice from "./slices/studentsSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contracts: contractsSlice,
    students: studentsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
