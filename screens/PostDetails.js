import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, Ionicons, MaterialIcons, Octicons } from "react-native-vector-icons"
import Wrapper from './Wrapper'
const PostDetails = ({ route }) => {
    const navigation = useNavigation()
    const { data } = route.params
    const [likes, setLikes] = useState({
        likes: data?.likes.length,
        isLiked: data?.likes?.includes('user_id') ? true : false
    })
    const handleLikes = async (isLiked) => {
        setLikes({
            likes: isLiked ? likes.likes + 1 : likes.likes - 1,
            isLiked: !likes.isLiked
        })
        if (isLiked) {
            data?.likes?.push('user_id')
        }
        else {
            data?.likes?.splice(data?.likes?.indexOf('user_id'), 1)
        }

        await updateLikes(data?.likes, data.id)
    }
    return (
        <Wrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ padding: 10, borderBottomColor: '#454343', borderWidth: 0.5 }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Octicons name="arrow-left" color="white" size={28} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 10, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', gap: 10
                    }}>
                        <View>
                            <TouchableOpacity onPress={() => { navigation.navigate('UserProfile') }}>
                                < Image source={require('../assets/images/vamsi.jpg')} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
                            <View>
                                <Text style={styles.name}>Vamsi</Text>
                                <Text style={styles.username}>@vamsi_nakka</Text>
                            </View>
                            <Octicons name="verified" color={"#bbbb"} size={18} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                        <Text style={styles.time}>2d</Text>
                        <TouchableOpacity style={{ padding: 10 }}>
                            <MaterialIcons name="more-vert" color={"#bbbb"} size={22} />
                        </TouchableOpacity>
                    </View>
                </View >
                <View style={{ paddingHorizontal: 10 }}>
                    {
                        data?.description != '' && <Text style={styles.description}>{data?.description}</Text>
                    }
                    <View style={{ marginBottom: 10 }}>
                        {
                            data?.image && <Image source={{ uri: data?.image }} style={styles.postImage} />
                        }
                    </View>
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
                        <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('PostDetails') }}>
                            <AntDesign name="retweet" color={"#BBBBBB"} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Wrapper >
    )
}

export default PostDetails

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
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
        color: 'rgba(255,255,255,0.8)',
        fontFamily: 'DmSans',
        fontSize: 20
    },
    postImage: {
        width: '100%',
        height: 350,
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
})
