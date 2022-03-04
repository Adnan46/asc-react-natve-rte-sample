/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react'
import {
  createClient,
  connectClient,
  isConnected,
  disconnectClient,
  enableCache,
} from '@amityco/ts-sdk'
import { apiKey, region } from '../../app.json'

const client = createClient(apiKey, region)
enableCache()

// eslint-disable-next-line import/prefer-default-export
export const AuthContext = React.createContext({
  client,
  error: '',
  login: () => {},
  logout: () => {},
  isConnected: false,
  isConnecting: false,
})

export const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState('')
  const [isConnecting, setLoading] = useState(false)

  const login = async ({ userId, displayName, authToken }) => {
    setError('')
    setLoading(true)
    try {
      const result = await connectClient({
        userId,
        displayName,
        authToken,
      })
      return result
    } catch (e) {
      const errorText = JSON.stringify(e)
      setError(errorText)
      return false
    } finally {
      setLoading(false)
    }
  }

  // TODO
  const logout = async () => {
    await disconnectClient()
  }

  return (
    <AuthContext.Provider
      value={{
        error,
        login,
        client,
        logout,
        isConnecting,
        isConnected: isConnected(),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
