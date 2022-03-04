import React, { useState } from 'react'
import { View, TextInput, Text, ActivityIndicator } from 'react-native'
import tailwind from 'tailwind-rn'
import { ButtonComponent } from '../../components/button'
import { CardComponent } from '../../components/card'
import { joinCommunity, createQuery, runQuery } from '@amityco/ts-sdk'
import useAuth from '../../hooks/useAuth'

import { communityId } from '../../../app.json'

const Login = ({ navigation }) => {
  const { login } = useAuth()
  const [userId, setUserId] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [authToken, setAuthToken] = useState('')

  const onUserIdChange = (value) => {
    setUserId(value.trim())
  }

  const onDisplayNameChange = (value) => {
    setDisplayName(value.trim())
  }

  const onAuthTokenChange = (value) => {
    setAuthToken(value.trim())
  }

  const onSubmitLogin = async () => {
    onlogIn(userId, displayName, authToken)
    if (userId.trim() != '' && displayName.trim() != '') {
      onlogIn(userId, displayName, authToken)
    }
  }

  const onlogIn = async (userId, displayName, authToken) => {
    setConnecting(true)
    const data = {
      userId: userId,
      displayName: displayName,
      authToken: authToken,
    }
    const resultLoggedIn = await login(data)
    setConnecting(false)
    if (resultLoggedIn) {
      onJoinCommunity()
    }
  }

  const onJoinCommunity = () => {
    const query = createQuery(joinCommunity, communityId)
    runQuery(query, (msg) => {
      if (msg.data) {
        navigation.navigate('Subscribe')
      }
    })
  }

  return (
    <View style={tailwind('h-full items-center bg-gray-100 p-12 pt-40')}>
      <CardComponent style={tailwind('bg-white rounded-lg p-6 w-full')}>
        {connecting ? (
          <ActivityIndicator size="large" />
        ) : (
          <View>
            <Text style={tailwind('text-gray-800 font-semibold')}>
              User ID:
            </Text>
            <TextInput
              style={tailwind(
                'border rounded w-full py-2 px-3 text-gray-700 mt-1',
              )}
              onChangeText={onUserIdChange}
              value={userId}
            />
            <Text style={tailwind('text-gray-800 font-semibold mt-2')}>
              Display Name:
            </Text>
            <TextInput
              style={tailwind(
                'border rounded w-full py-2 px-3 text-gray-700 mt-1',
              )}
              onChangeText={onDisplayNameChange}
              value={displayName}
            />
            <Text style={tailwind('text-gray-800 font-semibold mt-2')}>
              Auth Token (optional):
            </Text>
            <TextInput
              style={tailwind(
                'border rounded w-full py-2 px-3 text-gray-700 mt-1',
              )}
              onChangeText={onAuthTokenChange}
              value={authToken}
            />
            <View style={tailwind('flex-row justify-between')}>
              <ButtonComponent
                textValue={'LOG IN'}
                style={tailwind(
                  'bg-black w-full py-2 items-center rounded-md mt-6',
                )}
                textStyle={tailwind(
                  'text-white font-medium text-sm text-center',
                )}
                onSubmit={onSubmitLogin}
              />
            </View>
          </View>
        )}
      </CardComponent>
    </View>
  )
}

export { Login }
