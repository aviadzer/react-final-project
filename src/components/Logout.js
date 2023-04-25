import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

/* 
  This component implements the Logout page of the application.
  It uses a context to handle the state of the login
*/
export default function Logout() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
      console.log('Loggged out successfuly')
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(() => {
    handleLogout();
  }, [])

  return (
    <>
    </>
  )
}