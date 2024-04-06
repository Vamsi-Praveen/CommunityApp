import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Wrapper from './Wrapper'
import { Ionicons, Octicons } from "react-native-vector-icons"
import { useNavigation } from '@react-navigation/native'

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
  const [userId, setUserId] = useState('')
  const handlePost = async () => {
    const post = {
      description: description,
      image: image,
      likes: [],
      comments: [],
      userId: userId
    }
  }
  return (
    <Wrapper>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.text}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{
          flexDirection: 'row', gap: 15
        }}>
          <View>
            < Image source={require('../assets/images/vamsi.jpg')} style={styles.avatar} />
          </View>
          <View style={{ flex: 1, marginTop: -5 }}>
            <TextInput
              placeholder='Write your Thread ?'
              style={[styles.input, { height: inputHeight }]}
              cursorColor={"#454343"}
              placeholderTextColor={"#BBBBBb"}
              multiline
              onContentSizeChange={(e) => handleInputHeight(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)}
            />
          </View>
        </View>
      </View >
      <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
        <Octicons name="image" size={25} color={"#BBBBBB"} />
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
  }, text: {
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
  }
})