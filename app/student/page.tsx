"use client"

import { Container, Paper, Typography, Button, Box } from "@mui/material"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"
import { Download, Assignment } from "@mui/icons-material"

export default function StudentDashboard() {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)

  const handleDownloadTemplate = () => {
    // Имитация скачивания шаблона
    const link = document.createElement("a")
    link.href = "/placeholder.pdf"
    link.download = "template-contract.pdf"
    link.click()
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Добро пожаловать, {user?.name}!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Личный кабинет студента
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" startIcon={<Download />} onClick={handleDownloadTemplate} size="large">
            Скачать шаблон договора
          </Button>

          <Button
            variant="outlined"
            startIcon={<Assignment />}
            onClick={() => router.push("/student/contracts")}
            size="large"
          >
            Мои договоры
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
