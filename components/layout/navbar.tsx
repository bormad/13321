"use client"

import type React from "react"

import { useState } from "react"
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material"
import { AccountCircle, ExitToApp } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { logout } from "@/store/slices/authSlice"

export default function Navbar() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
    handleClose()
  }

  const handleProfile = () => {
    router.push("/profile")
    handleClose()
  }

  const getNavItems = () => {
    if (!user) return []

    switch (user.role) {
      case "student":
        return [
          { label: "Главная", path: "/student" },
          { label: "Мои договоры", path: "/student/contracts" },
        ]
      case "methodist":
      case "admin":
        return [
          { label: "Договоры", path: "/contracts" },
          { label: "Студенты", path: "/students" },
        ]
      default:
        return []
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Система учёта договоров
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {getNavItems().map((item) => (
            <Button key={item.path} color="inherit" onClick={() => router.push(item.path)}>
              {item.label}
            </Button>
          ))}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">{user?.name}</Typography>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleProfile}>
                <AccountCircle sx={{ mr: 1 }} />
                Профиль
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Выйти
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
