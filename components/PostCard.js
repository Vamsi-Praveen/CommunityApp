import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Octicons, AntDesign, Ionicons, MaterialIcons } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native'
import { updateLikes } from '../services/Post.service'
import { useSelector } from "react-redux"

const PostCard = ({ border, data }) => {
    const navigation = useNavigation()
    const userId = useSelector((state) => state.auth.userId)
    const [likes, setLikes] = useState({
        likes: data?.likes.length,
        isLiked: data?.likes?.includes(userId) ? true : false
    })
    const handleLikes = async (isLiked) => {
        setLikes({
            likes: isLiked ? likes.likes + 1 : likes.likes - 1,
            isLiked: !likes.isLiked
        })
        if (isLiked) {
            data?.likes?.push(userId)
        }
        else {
            data?.likes?.splice(data?.likes?.indexOf(userId), 1)
        }

        await updateLikes(data?.likes, data.id)
    }
    return (
        <View style={[styles.container, border && styles.border]}>
            <View style={{ flexDirection: 'row', gap: 15 }}>
                <View>
                    {
                        data?.avatar ? (<TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
                            <Image source={{ uri: data?.avatar }} style={styles.avatar} />
                        </TouchableOpacity>) : (
                            <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
                                <View style={[styles.avatar, { alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue' }]}>
                                    <Text style={{ color: 'black', fontSize: 20, fontFamily: 'DmSans-B' }}>{data?.fullName.split('')[0]}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                </View>
                <View style={{ flex: 1 }}>
                    <Pressable onPress={() => { navigation.navigate('PostDetails', { data: data }) }}>
                        <View style={{ flexDirection: 'row', marginBottom: 3, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.name}>{data?.fullName.split(' ')[0]}</Text>
                                <Text style={styles.username}>@{data?.username}</Text>
                                {
                                    data?.isVerified && <Octicons name="verified" color={"#bbbb"} size={18} />
                                }
                                <Text style={styles.time}>2d</Text>
                            </View>
                            <TouchableOpacity style={styles.btn}>
                                <MaterialIcons name="more-vert" color={"#bbbb"} size={22} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {/* <Text style={styles.description}>Hi guys, i am facing issue in the react native expo app i am setting the authencation here i need to setup the authentication i need to crete and delete the issue thank you.</Text> */}
                            {
                                data?.description != '' &&
                                <Text style={styles.description}>{data?.description}</Text>
                            }
                        </View>
                        <View>
                            {
                                data?.image &&
                                <Image source={{ uri: data?.image }} style={styles.postImage} />
                            }
                        </View>
                    </Pressable>
                    <View style={styles.icons}>
                        <TouchableOpacity style={[styles.icon, styles.btn]} onPress={() => { handleLikes(!likes.isLiked) }}>
                            {
                                likes.isLiked ? <Octicons name="heart-fill" color={"#BBBBBB"} size={22} /> : <Octicons name="heart" color={"#BBBBBB"} size={22} />
                            }
                            <Text style={styles.iconText}>{likes.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.icon, styles.btn]}>
                            <Ionicons name="chatbubble-outline" color={"#BBBBBB"} size={22} />
                            <Text style={styles.iconText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <Octicons name="bookmark" color={"#BBBBBB"} size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn}>
                            <AntDesign name="retweet" color={"#BBBBBB"} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        padding: 10,
        marginVertical: 4,
        width: '100%',
    },
    border: {
        borderColor: '#454343',
        borderTopWidth: 0.3,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 100,
        borderColor: '#454343',
        borderWidth: 0.5
    },
    name: {
        color: 'white',
        fontFamily: 'DmSans',
        fontSize: 18
    },
    username: {
        color: '#bbbb',
        fontFamily: 'DmSans',
        fontSize: 16
    },
    time: {
        color: "#bbbb",
        fontFamily: 'DmSans',
        fontSize: 18, marginLeft: 12
    },
    description: {
        color: 'rgba(255,255,255,0.9)',
        fontFamily: 'DmSans',
        fontSize: 18
    },
    postImage: {
        width: '100%',
        height: 300,
        marginVertical: 10,
        borderRadius: 12,
        borderColor: '#454343',
        borderWidth: 0.5
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        marginTop: 2
    },
    iconText: {
        color: '#bbbb',
        fontFamily: 'DmSans',
        fontSize: 22
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    btn: {
        padding: 4
    },
    border: {
        borderColor: '#454343',
        borderTopWidth: 0.3,
    }
})