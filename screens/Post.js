import { useNavigation } from '@react-navigation/native'
import * as DocumentPicker from 'expo-document-picker'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons, Octicons } from "react-native-vector-icons"
import { createPost, uploadImage } from '../services/Post.service'
import Wrapper from './Wrapper'
import { useSelector } from 'react-redux'

const Post = () => {
  const navigation = useNavigation()
  const [inputHeight, setInputHeight] = useState(60)
  const handleInputHeight = (contentWidth, contentHeight) => {
    const minHeight = 60;
    const maxHeight = 150;

    const newHeight = Math.max(minHeight, Math.min(maxHeight, contentHeight))
    if (inputHeight != newHeight) {
      setInputHeight(newHeight)
    }
  }
  const [description, setDesscription] = useState('')
  const [image, setImage] = useState(null)
  const userId = useSelector((state) => state.auth.userId)
  const details = useSelector((state) => state.auth.details)
  const handlePost = async () => {
    if (image) {
      const imageURL = await uploadImage(image)
      const post = {
        description: description,
        image: imageURL,
        likes: [],
        comments: [],
        userId: userId,
        date: new Date().toISOString()
      }
      await createPost(post)
      return navigation.navigate('Home')
    }
    const post = {
      description: description,
      image: null,
      likes: [],
      comments: [],
      userId: userId,
      date: new Date().toISOString()
    }
    await createPost(post)
    return navigation.navigate('Home')
  }
  const handleImage = async () => {
    try {
      const image = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      })
      //if image is fetched succesfully we need to take uri and store for displaying
      if (!image.canceled) {
        if (image?.assets[0]?.uri) {
          setImage(image?.assets?.[0]?.uri)
        }
      }

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Wrapper>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={image || description != '' ? styles.button : styles.buttonActive} onPress={handlePost}>
            <Text style={styles.text}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{
          flexDirection: 'row', gap: 15
        }}>
          <View>
            {
              details?.avatar ? <Image source={{ uri: details?.avatar }} style={styles.avatar} />
                :
                <View style={[styles.avatar, { backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }]}>
                  <Text style={{ fontSize: 24, fontFamily: 'DmSans', color: 'black' }}>{details?.fullName?.split('')[0]}</Text>
                </View>
            }
          </View>
          <View style={{ flex: 1, marginTop: -5 }}>
            <TextInput
              placeholder='Write your Thread ?'
              style={[styles.input, { height: inputHeight }]}
              cursorColor={"#454343"}
              placeholderTextColor={"#BBBBBb"}
              multiline
              onContentSizeChange={(e) => handleInputHeight(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)}
              onChangeText={(value) => { setDesscription(value) }}
            />
          </View>
        </View>
      </View >
      <TouchableOpacity style={{ marginTop: 20, paddingHorizontal: 15 }} onPress={handleImage}>
        <Octicons name="image" size={25} color={"#BBBBBB"} />
      </TouchableOpacity>
      <View style={{ marginTop: 15 }}>
        {
          image && <>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => { setImage(null) }}>
              <Ionicons name="close" size={20} color={'white'} />
            </TouchableOpacity>
          </>
        }
      </View>
    </Wrapper >
  )
}

export default Post

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'skyblue',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20
  },
  buttonActive: {
    pointerEvents: 'none',
    backgroundColor: '#c0d0eb80',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 20
  },
  text: {
    fontFamily: 'DmSans',
    color: "black",
    fontSize: 18
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: '#454343',
    borderWidth: 0.5
  },
  input: {
    fontFamily: 'DmSans',
    color: '#BBBBBB',
    fontSize: 18,
    paddingLeft: 5,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 12,
    position: 'relative'
  },
  closeBtn: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 10,
    padding: 2,
    borderColor: '#454343',
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: '#454343'
  }
})