"use client"

import { useState } from "react"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  IconButton,
} from "@mui/material"
import { Add, Visibility, Download } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"

export default function StudentContracts() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const { contracts } = useAppSelector((state) => state.contracts)
  const { user } = useAppSelector((state) => state.auth)

  // Фильтруем договоры студента
  const studentContracts = contracts.filter(
    (contract) => contract.studentId === user?.id && contract.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "default"
      case "pending":
        return "warning"
      case "approved":
        return "success"
      case "rejected":
        return "error"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Черновик"
      case "pending":
        return "На рассмотрении"
      case "approved":
        return "Одобрен"
      case "rejected":
        return "Отклонен"
      default:
        return status
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">Мои договоры</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => router.push("/student/contracts/new")}>
            Добавить договор
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Поиск по названию компании"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Компания</TableCell>
                <TableCell>Тип практики</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>{contract.number}</TableCell>
                  <TableCell>{contract.company}</TableCell>
                  <TableCell>{contract.practiceType}</TableCell>
                  <TableCell>
                    <Chip label={getStatusText(contract.status)} color={getStatusColor(contract.status)} size="small" />
                  </TableCell>
                  <TableCell>{new Date(contract.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => router.push(`/contracts/${contract.id}`)} size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
}
