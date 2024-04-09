import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import Wrapper from './Wrapper'
import { getUser, loginUser } from '../services/User.service'
import { useDispatch } from "react-redux"
import { setUser } from '../redux/authSlice'
import { useNavigation } from "@react-navigation/native"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const navigation = useNavigation()
    const handleLogin = async () => {
        Keyboard.dismiss()
        setError('')
        setLoading(true)
        if (email != '' && password != '') {
            try {
                const userData = await loginUser(email, password)
                if (userData.code === 'auth/invalid-email' || userData.code === 'auth/user-not-found') {
                    setError('Invalid username or email');
                } else if (userData.code === 'auth/wrong-password') {
                    setError('Invalid password');
                }
                else if (userData.code === 'auth/invalid-credential') {
                    setError('Invalid Credentials');
                }
                else if (userData.code === 'auth/too-many-requests') {
                    setError('Too many Attempts, Try Again');
                }
                if (userData?.user) {
                    const details = await getUser(userData?.user?.uid)
                    dispatch(setUser({ user: userData.user.uid, details: details }))
                    navigation.replace('Main')
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
    }
    return (
        <Wrapper>
            <View style={styles.container}>
                <Text style={{ fontFamily: 'DmSans', fontSize: 35, color: 'white' }}>Welcome back 🖐</Text>
                <View style={{ marginTop: 20, width: '90%', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <TextInput
                        placeholder='Email Address'
                        style={styles.input}
                        cursorColor={"#454343"}
                        placeholderTextColor={"#BBBBBb"}
                        keyboardType='email-address'
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                        placeholder='Password'
                        style={styles.input}
                        cursorColor={"#454343"}
                        placeholderTextColor={"#BBBBBb"}
                        secureTextEntry
                        onChangeText={(value) => setPassword(value)}

                    />
                </View>
                {
                    error && <View style={{ alignSelf: 'flex-start', paddingHorizontal: 25, marginTop: 10 }}>
                        <Text style={{ fontFamily: 'DmSans', fontSize: 20, color: '#454343' }}>{error}</Text>
                    </View>
                }
                <TouchableOpacity style={{ backgroundColor: 'skyblue', width: '90%', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, marginTop: 20, borderRadius: 2 }}
                    onPress={handleLogin} disabled={loading}
                >
                    {
                        loading ? <ActivityIndicator color={'black'} size={25} /> :
                            <Text style={{ fontFamily: 'DmSans', fontSize: 25, color: 'black' }}>Login</Text>
                    }
                </TouchableOpacity>
            </View>
        </Wrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontFamily: 'DmSans',
        color: '#BBBBBB',
        fontSize: 18,
        paddingLeft: 5,
        width: '100%',
        paddingVertical: 10,
        borderBottomColor: '#454343',
        borderWidth: 0.6
    },
})