import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { mockContracts } from "@/data/mockData"

interface Contract {
  id: string
  number: string
  studentId: string
  studentName: string
  group: string
  company: string
  practiceType: string
  status: "draft" | "pending" | "approved" | "rejected"
  date: string
  startDate?: string
  endDate?: string
  supervisorName?: string
  comment?: string
  files?: string[]
  rejectReason?: string
}

interface ContractsState {
  contracts: Contract[]
}

const initialState: ContractsState = {
  contracts: mockContracts,
}

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<Contract>) => {
      state.contracts.push(action.payload)
    },
    updateContract: (state, action: PayloadAction<Contract>) => {
      const index = state.contracts.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.contracts[index] = action.payload
      }
    },
    updateContractStatus: (
      state,
      action: PayloadAction<{ id: string; status: Contract["status"]; rejectReason?: string }>,
    ) => {
      const contract = state.contracts.find((c) => c.id === action.payload.id)
      if (contract) {
        contract.status = action.payload.status
        if (action.payload.rejectReason) {
          contract.rejectReason = action.payload.rejectReason
        }
      }
    },
    deleteContract: (state, action: PayloadAction<string>) => {
      state.contracts = state.contracts.filter((c) => c.id !== action.payload)
    },
  },
})

export const { addContract, updateContract, updateContractStatus, deleteContract } = contractsSlice.actions
export default contractsSlice.reducer
