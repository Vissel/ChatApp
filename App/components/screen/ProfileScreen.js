import React, { Component } from 'react'

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import firebase from 'react-native-firebase'
import { componentByNodeRegistery } from 'mobx-react';

export default class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerStyle: {
      backgroundColor: '#40C4FF'
    }
  })
  componentWillMount() {
    firebase.database().ref(`/users/${this.props.navigation.state.params.uid}`)
      .on('value', (userChat) => {
        this.props.navigation.setParams({
          isOnline: userChat.val() ? userChat.val().isOnline : false
        })
        console.log('UIDssss', this.props.navigation.state.params.uid)
      })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={styleShow.container}>
        <View style={styleShow.avatar}>
          <Image
            borderRadius={50}
            source={{ uri: this.props.navigation.state.params.imageURL ? this.props.navigation.state.params.imageURL : '../images/icon_user.png' }}
            style={styleShow.imageStyle}
          />

          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>{this.props.navigation.state.params.name}</Text>
          {this.props.navigation.state.params.isOnline
            ? <Text style={{ color: '#76FF03' }}>(Online)</Text>
            : <Text style={{ color: '#F44336' }}>(Offline)</Text>}

        </View>
        <View style={styleShow.content}>
          <View style={styleShow.tags}>
            <Image
              borderRadius={50}
              source={require('../../components/img/icon_user.png')}
              style={{ width: 45, height: 45 }}
            />
            <Text style={styleShow.txtInfo}>{this.props.navigation.state.params.userName}</Text>
          </View>
          <View style={styleShow.tags}>
            <Image
              borderRadius={50}
              source={require('../../components/img/icon_phone.png')}
              style={{ width: 35, height: 35 }}
            />
            <Text style={styleShow.txtInfo}>{this.props.navigation.state.params.phoneNumber}</Text>
          </View>
        </View>
        <View style={styleShow.footer}>
          <TouchableOpacity
            style={styleShow.button}
            onPress={() => {
              navigate('BasicFlatist', {
                name: this.props.navigation.state.params.name,
                isOnline: this.props.navigation.state.params.isOnline,
                imageURL: this.props.navigation.state.params.imageURL,
                chatID: this.props.navigation.state.params.chatID,
                uid: this.props.navigation.state.params.uid
              })
            }}
          >
            <Image
              source={require('../img/icon_messenger.png')}
              style={{ width: 20, height: 20, borderRadius: 10, marginRight: 10 }}
            />
            <Text style={{ color: 'white', fontSize: 15 }}>Chat now</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              navigate('HistoryScreen')
            }}
            style={styleShow.button}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    )
  }
}

ProfileScreen.defaultProps = {
  imageURL: '../../assets/images/icon-user.png'
}

const styleShow = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9'
  },
  imageStyle: {
    width: 100,
    height: 100
  },
  avatar: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9E9E9E'
  },
  // infoStyle: {
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  content: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  button: {
    flex: 1 / 2,
    margin: 10,
    padding: 10,
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  // title: {
  //   fontSize: 38,
  //   backgroundColor: 'transparent'
  // },
  txtInfo: {
    padding: 10,
    color: 'black',
    fontSize: 15,
  },
  tags: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})
