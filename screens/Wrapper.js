import React from 'react'
import { StyleSheet, View } from 'react-native'

const Wrapper = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 5
    }
})