import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from '../screens/Login'
import Main from '../screens/Main'
import PostDetails from '../screens/PostDetails'
import Register from '../screens/Register'
import UserProfile from '../screens/UserProfile'

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Main'>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='PostDetails' component={PostDetails} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='UserProfile' component={UserProfile} />
        </Stack.Navigator>
    )
}

export default StackNavigation