import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import {
  FetchUserPrivilage
} from '../util/util'

/**
 * This context keeps the login state of the user, based on Firebase authentication
 */

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async function(user) {
      if(user){
      const privilage = await FetchUserPrivilage(user._delegate.email);
      setCurrentUser({user, privilage})
      }
      else
      setCurrentUser({user})
      setLoading(false)

    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
 
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}