"use client"

import { useState } from "react"
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material"
import { useParams, useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { updateContractStatus } from "@/store/slices/contractsSlice"

export default function ContractDetails() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const { contracts } = useAppSelector((state) => state.contracts)
  const { user } = useAppSelector((state) => state.auth)

  const contract = contracts.find((c) => c.id === params.id)

  if (!contract) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6">Договор не найден</Typography>
      </Container>
    )
  }

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

  const handleApprove = () => {
    dispatch(updateContractStatus({ id: contract.id, status: "approved" }))
  }

  const handleReject = () => {
    dispatch(
      updateContractStatus({
        id: contract.id,
        status: "rejected",
        rejectReason,
      }),
    )
    setRejectDialogOpen(false)
    setRejectReason("")
  }

  const canModifyStatus = user?.role === "methodist" || user?.role === "admin"

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5">Договор №{contract.number}</Typography>
          <Chip label={getStatusText(contract.status)} color={getStatusColor(contract.status)} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Информация о студенте
            </Typography>
            <Typography>
              <strong>ФИО:</strong> {contract.studentName}
            </Typography>
            <Typography>
              <strong>Группа:</strong> {contract.group}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Информация о практике
            </Typography>
            <Typography>
              <strong>Тип:</strong> {contract.practiceType}
            </Typography>
            <Typography>
              <strong>Компания:</strong> {contract.company}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Дата начала:</strong>{" "}
              {contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "Не указана"}
            </Typography>
            <Typography>
              <strong>Дата окончания:</strong>{" "}
              {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : "Не указана"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Руководитель:</strong> {contract.supervisorName || "Не указан"}
            </Typography>
            <Typography>
              <strong>Дата создания:</strong> {new Date(contract.date).toLocaleDateString()}
            </Typography>
          </Grid>

          {contract.comment && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Комментарий
              </Typography>
              <Typography>{contract.comment}</Typography>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Прикрепленные файлы
        </Typography>
        {contract.files && contract.files.length > 0 ? (
          <List>
            {contract.files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file} />
                <Button size="small">Скачать</Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">Файлы не прикреплены</Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          История изменений
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Договор создан" secondary={new Date(contract.date).toLocaleString()} />
          </ListItem>
        </List>

        {canModifyStatus && contract.status === "pending" && (
          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button variant="contained" color="success" onClick={handleApprove}>
              Подписать
            </Button>
            <Button variant="outlined" color="error" onClick={() => setRejectDialogOpen(true)}>
              Отправить на доработку
            </Button>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="outlined">Скачать</Button>
          <Button variant="text" onClick={() => router.back()}>
            Назад
          </Button>
        </Box>
      </Paper>

      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
        <DialogTitle>Отправить на доработку</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Причина отклонения"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleReject} variant="contained" color="error">
            Отклонить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
