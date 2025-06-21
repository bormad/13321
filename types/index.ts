export interface User {
  id: string
  name: string
  email: string
  role: "student" | "methodist" | "admin"
  group?: string
  phone?: string
}

export interface Contract {
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

export interface Student {
  id: string
  name: string
  email: string
  group: string
  role: "student"
  phone?: string
}
