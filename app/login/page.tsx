"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Container, Paper, TextField, Button, Typography, Box, Link, Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { login } from "@/store/slices/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Валидация
    if (!email || !password) {
      setError("Заполните все поля")
      return
    }

    if (password.length < 8) {
      setError("Пароль должен содержать не менее 8 символов")
      return
    }

    try {
      const result = await dispatch(login({ email, password }))
      if (login.fulfilled.match(result)) {
        router.push("/")
      } else {
        setError((result.payload as string) || "Ошибка входа")
      }
    } catch (err) {
      setError("Ошибка входа")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Вход в систему
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? "Вход..." : "Войти"}
            </Button>
            <Box textAlign="center">
              <Link href="#" variant="body2">
                Забыли пароль?
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
