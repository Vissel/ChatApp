import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import firebase from 'react-native-firebase'


export default class TestFunc extends Component {

  onTest = () => {
    // firebase.database().ref('/chats').push({ key: 'ol7cZCdFuHRMJ6hlYTGtp42kXrR2|giUzgsvyDXXIAi44HZXavMl5Pj62' })
    firebase.database().ref('/chats/-LGpo6sTlhGvy-aTY6Qq/messages').push({ message: '123' })
    // firebase.database().ref('/friendRequests/ol7cZCdFuHRMJ6hlYTGtp42kXrR2').push({ uid: 'giUzgsvyDXXIAi44HZXavMl5Pj62', status: 3 })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            this.onTest()
          }}
        >
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
