import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { mockStudents } from "@/data/mockData"

interface Student {
  id: string
  name: string
  email: string
  group: string
  role: "student"
  phone?: string
}

interface StudentsState {
  students: Student[]
}

const initialState: StudentsState = {
  students: mockStudents,
}

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload)
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id)
      if (index !== -1) {
        state.students[index] = action.payload
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter((s) => s.id !== action.payload)
    },
  },
})

export const { addStudent, updateStudent, deleteStudent } = studentsSlice.actions
export default studentsSlice.reducer
