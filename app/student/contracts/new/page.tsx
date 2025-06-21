"use client"

import { useState } from "react"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addContract } from "@/store/slices/contractsSlice"

export default function NewContract() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    practiceType: "",
    company: "",
    startDate: "",
    endDate: "",
    supervisorName: "",
    comment: "",
  })

  const practiceTypes = ["Учебная практика", "Производственная практика", "Преддипломная практика"]

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveDraft = () => {
    const contract = {
      id: Date.now().toString(),
      number: `${Date.now()}`,
      studentId: user?.id || "",
      studentName: user?.name || "",
      group: user?.group || "",
      company: formData.company,
      practiceType: formData.practiceType,
      status: "draft" as const,
      date: new Date().toISOString(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      supervisorName: formData.supervisorName,
      comment: formData.comment,
      files: [],
    }

    dispatch(addContract(contract))
    router.push("/student/contracts")
  }

  const handleSubmit = () => {
    const contract = {
      id: Date.now().toString(),
      number: `${Date.now()}`,
      studentId: user?.id || "",
      studentName: user?.name || "",
      group: user?.group || "",
      company: formData.company,
      practiceType: formData.practiceType,
      status: "pending" as const,
      date: new Date().toISOString(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      supervisorName: formData.supervisorName,
      comment: formData.comment,
      files: [],
    }

    dispatch(addContract(contract))
    router.push("/student/contracts")
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Добавление договора
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Тип практики</InputLabel>
              <Select
                value={formData.practiceType}
                label="Тип практики"
                onChange={(e) => handleChange("practiceType", e.target.value)}
              >
                {practiceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Название компании"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Дата начала практики"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Дата окончания практики"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ФИО руководителя"
              value={formData.supervisorName}
              onChange={(e) => handleChange("supervisorName", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Комментарий"
              multiline
              rows={4}
              value={formData.comment}
              onChange={(e) => handleChange("comment", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Загрузить файл (PDF, JPG, PNG)
              <input type="file" hidden accept=".pdf,.jpg,.jpeg,.png" />
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button variant="outlined" onClick={handleSaveDraft}>
            Сохранить черновик
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Отправить на подпись
          </Button>
          <Button variant="text" onClick={() => router.back()}>
            Отмена
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
