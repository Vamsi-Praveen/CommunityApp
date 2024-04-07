import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../services/Post.service'

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true)
        try {
            await fetchPosts()
        } catch (err) {
            console.log(err)
        }
        finally {
            setRefreshing(false)
        }
    }
    const [posts, setPost] = useState([])
    const fetchPosts = async () => {
        setLoading(true)
        const posts = await getAllPosts()
        setPost(posts)
        setLoading(false)
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    return (
        <Wrapper>
            {
                loading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <ActivityIndicator size={24} color={'white'} />
                    </View>
                ) : (
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        renderItem={({ item, index }) => (index == 0 ? <PostCard data={item} /> : <PostCard border data={item} />)}
                    />)
            }
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