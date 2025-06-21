import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { mockUsers } from "@/data/mockData"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "methodist" | "admin"
  group?: string
  phone?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
}

// Async thunk для логина
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    // Имитация задержки сервера
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return rejectWithValue("Неверный email или пароль")
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      group: user.group,
      phone: user.phone,
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.token = null
      state.error = null
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.token = "mock-token-" + action.payload.id
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, updateUserProfile, clearError } = authSlice.actions
export default authSlice.reducer
