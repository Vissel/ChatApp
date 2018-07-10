
import React, { Component } from 'react'
import { StatusBar, View, Platform } from 'react-native'
import Root from './App/components/Router'

export default class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='dark-content' backgroundColor='white' />
        <Root />
      </View>
    )
  }
}
