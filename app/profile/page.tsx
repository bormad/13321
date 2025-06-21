"use client"

import { useState } from "react"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { useAppSelector, useAppDispatch } from "@/store/hooks"

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const getRoleText = (role: string) => {
    switch (role) {
      case "student":
        return "Студент"
      case "methodist":
        return "Методист"
      case "admin":
        return "Администратор"
      default:
        return role
    }
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Пароли не совпадают")
      return
    }

    if (passwordData.newPassword.length < 8) {
      alert("Пароль должен содержать не менее 8 символов")
      return
    }

    // Имитация смены пароля
    console.log("Пароль изменен")
    setPasswordDialogOpen(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  if (!user) {
    return <div>Загрузка...</div>
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Профиль пользователя
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="ФИО" value={user.name} InputProps={{ readOnly: true }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Email" value={user.email} InputProps={{ readOnly: true }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Роль" value={getRoleText(user.role)} InputProps={{ readOnly: true }} />
          </Grid>

          {user.group && (
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Группа" value={user.group} InputProps={{ readOnly: true }} />
            </Grid>
          )}

          {user.phone && (
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Телефон" value={user.phone} InputProps={{ readOnly: true }} />
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Безопасность
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={() => setPasswordDialogOpen(true)}>
            Сменить пароль
          </Button>
        </Box>
      </Paper>

      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Смена пароля</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Текущий пароль"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Новый пароль"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Подтвердите новый пароль"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Сменить пароль
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
