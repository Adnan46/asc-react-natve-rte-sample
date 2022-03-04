import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SubscribePage } from './src/pages/SubscribePage'
import { Login } from './src/pages/login'
import { AuthContextProvider } from './src/provider'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="Subscribe" component={SubscribePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  )
}
