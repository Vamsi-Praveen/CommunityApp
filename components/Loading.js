import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color={'white'} />
        </View>
    )
}

export default Loading