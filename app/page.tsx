"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/store/hooks"

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else {
      // Перенаправление в зависимости от роли
      switch (user?.role) {
        case "student":
          router.push("/student")
          break
        case "methodist":
        case "admin":
          router.push("/contracts")
          break
        default:
          router.push("/login")
      }
    }
  }, [isAuthenticated, user, router])

  return <div>Загрузка...</div>
}
