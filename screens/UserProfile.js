import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from "react-redux"
import Wrapper from './Wrapper'

const UserProfile = () => {
    const { userId } = useSelector((state) => state.auth)
    return (
        <Wrapper>
            <View>
                <Text style={{ color: 'white', fontSize: 20 }}>{userId}</Text>
            </View>
        </Wrapper>
    )
}

export default UserProfile

const styles = StyleSheet.create({})