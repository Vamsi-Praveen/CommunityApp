import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Octicons } from 'react-native-vector-icons'
import PostCard from "../components/PostCard"
import { userPosts } from "../services/Post.service"
import Wrapper from './Wrapper'
import { getUser } from "../services/User.service"

const UserProfile = ({ route }) => {
    const navigation = useNavigation()
    const { userId } = route.params;
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState([])

    const fetchUserAndPosts = async () => {
        setLoading(true)
        const details = await getUser(userId)
        setDetails(details)
        const userposts = await userPosts(userId)
        const postsData = userposts?.map((post) => {
            const newDetails = { ...post, ...details }
            return newDetails ?? {}
        })
        console.log("post Details of user is: ", postsData)
        setPosts(postsData)
        setLoading(false)
    }
    useEffect(() => {
        fetchUserAndPosts()
    }, []);
    const getDisplayName = () => {
        return details?.fullName?.split(' ').map((e) => {
            return e.split('')[0].toUpperCase()
        }) ?? ''
    }
    return (
        <Wrapper>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl onRefresh={fetchUserAndPosts} refreshing={loading} />}

            >
                <View style={{ height: 200, position: 'relative' }}>
                    <View style={{ backgroundColor: 'skyblue', height: '75%' }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 6, justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => { navigation.goBack() }}
                                style={{
                                    height: 35, width: 35, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0,0,0,0.4)"
                                }}>
                                <Octicons name="arrow-left" color="white" size={25} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{
                                    height: 35, width: 35, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0,0,0,0.4)"
                                }}>
                                <Octicons name="search" color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        details?.avatar ?
                            <Image source={{ uri: details?.avatar }} style={styles.avatar} />
                            :
                            <View style={[styles.avatar, { backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderWidth: 1 }]}>
                                <Text style={{ fontSize: 40, fontFamily: 'DmSans', color: 'black' }}>{getDisplayName()}</Text>
                            </View>
                    }
                </View>
                <View style={{ paddingHorizontal: 10, marginVertical: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text style={styles.fullname}>{details?.fullName}</Text>
                        {
                            details?.isVerified && <Octicons name="verified" color={"#bbbb"} size={20} />
                        }
                    </View>
                    <Text style={styles.username}>@{details?.username}</Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.bio}>{details?.bio != '' ? details?.bio : 'No Bio'}</Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    {
                        loading ? (
                            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator color={'skyblue'} size={22} />
                            </View>
                        ) : (posts.map((post, index) => {
                            return <PostCard data={post} key={index} border />
                        }))
                    }
                </View>
            </ScrollView>
        </Wrapper >
    )
}

export default UserProfile

const styles = StyleSheet.create({
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 100,
        borderWidth: 0.6,
        borderColor: '#454343',
        position: 'absolute',
        bottom: 5,
        left: 10
    },
    fullname: {
        color: 'white',
        fontFamily: 'DmSans',
        fontSize: 28
    },
    username: {
        color: '#bbbbbb',
        fontFamily: 'DmSans',
        fontSize: 18,
        marginTop: 3
    },
    bio: {
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'DmSans',
        fontSize: 16
    }
})