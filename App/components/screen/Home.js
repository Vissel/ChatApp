import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default class Home extends Component {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Home
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('BasicFlatist')}
        >
          <Text>
            Home
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
