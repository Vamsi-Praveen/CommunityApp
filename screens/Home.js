import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Wrapper from './Wrapper'
import PostCard from '../components/PostCard'

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }
    return (
        <Wrapper>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3]}
                renderItem={() => (<PostCard border />)}
            />
        </Wrapper>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: 'DmSans',
        fontSize: 20
    }
})