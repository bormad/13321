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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material"
import { Visibility, Download, FileDownload } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"

export default function AllContracts() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [practiceTypeFilter, setPracticeTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const { contracts } = useAppSelector((state) => state.contracts)
  const { students } = useAppSelector((state) => state.students)

  // Фильтрация договоров
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = !groupFilter || contract.group === groupFilter
    const matchesPracticeType = !practiceTypeFilter || contract.practiceType === practiceTypeFilter
    const matchesStatus = !statusFilter || contract.status === statusFilter

    return matchesSearch && matchesGroup && matchesPracticeType && matchesStatus
  })

  const groups = [...new Set(students.map((s) => s.group))]
  const practiceTypes = [...new Set(contracts.map((c) => c.practiceType))]

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

  const handleExportToExcel = () => {
    // Имитация экспорта в Excel
    console.log("Экспорт в Excel")
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">Все договоры</Typography>
          <Button variant="contained" startIcon={<FileDownload />} onClick={handleExportToExcel}>
            Экспорт в Excel
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Поиск"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Группа</InputLabel>
              <Select value={groupFilter} label="Группа" onChange={(e) => setGroupFilter(e.target.value)}>
                <MenuItem value="">Все группы</MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Тип практики</InputLabel>
              <Select
                value={practiceTypeFilter}
                label="Тип практики"
                onChange={(e) => setPracticeTypeFilter(e.target.value)}
              >
                <MenuItem value="">Все типы</MenuItem>
                {practiceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Статус</InputLabel>
              <Select value={statusFilter} label="Статус" onChange={(e) => setStatusFilter(e.target.value)}>
                <MenuItem value="">Все статусы</MenuItem>
                <MenuItem value="draft">Черновик</MenuItem>
                <MenuItem value="pending">На рассмотрении</MenuItem>
                <MenuItem value="approved">Одобрен</MenuItem>
                <MenuItem value="rejected">Отклонен</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>ФИО студента</TableCell>
                <TableCell>Группа</TableCell>
                <TableCell>Компания</TableCell>
                <TableCell>Тип практики</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>{contract.number}</TableCell>
                  <TableCell>{contract.studentName}</TableCell>
                  <TableCell>{contract.group}</TableCell>
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
