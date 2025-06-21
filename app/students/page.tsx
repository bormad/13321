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
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material"
import { Add, Edit, Delete, FileUpload } from "@mui/icons-material"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { addStudent, updateStudent, deleteStudent } from "@/store/slices/studentsSlice"

export default function StudentsManagement() {
  const dispatch = useAppDispatch()
  const { students } = useAppSelector((state) => state.students)

  const [searchTerm, setSearchTerm] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    group: "",
    phone: "",
  })

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGroup = !groupFilter || student.group === groupFilter
    return matchesSearch && matchesGroup
  })

  const groups = [...new Set(students.map((s) => s.group))]

  const handleOpenDialog = (student?: any) => {
    if (student) {
      setEditingStudent(student)
      setFormData({
        name: student.name,
        email: student.email,
        group: student.group,
        phone: student.phone || "",
      })
    } else {
      setEditingStudent(null)
      setFormData({ name: "", email: "", group: "", phone: "" })
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingStudent(null)
    setFormData({ name: "", email: "", group: "", phone: "" })
  }

  const handleSave = () => {
    if (editingStudent) {
      dispatch(updateStudent({ ...editingStudent, ...formData }))
    } else {
      dispatch(
        addStudent({
          id: Date.now().toString(),
          ...formData,
          role: "student",
        }),
      )
    }
    handleCloseDialog()
  }

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этого студента?")) {
      dispatch(deleteStudent(id))
    }
  }

  const handleImportExcel = () => {
    // Имитация импорта из Excel
    console.log("Импорт из Excel")
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">Управление студентами</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" startIcon={<FileUpload />} onClick={handleImportExcel}>
              Импорт из Excel
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
              Добавить студента
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Поиск по ФИО или email"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Фильтр по группе"
              variant="outlined"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
            />
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Группа</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.group}</TableCell>
                  <TableCell>{student.phone || "Не указан"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(student)} size="small">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(student.id)} size="small" color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingStudent ? "Редактировать студента" : "Добавить студента"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ФИО"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Группа"
                value={formData.group}
                onChange={(e) => setFormData((prev) => ({ ...prev, group: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">
            {editingStudent ? "Сохранить" : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
