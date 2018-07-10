import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import firebase from 'react-native-firebase'
import chatHistory from '../../store/ChatHistoryStore';
import friendsStore from '../../store/FriendsStore';

const ImagePicker = require('react-native-image-picker')

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class UserInfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }
  componentWillMount() {
    const userID = firebase.auth().currentUser.uid
    firebase.database().ref('users/' + userID).once('value', (userLogged) => {
      this.setState({
        user: userLogged.val()
      })
    })

  }
  showImage() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.path)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        // const source = { uri: response.uri }
        // this.setState({
        //   avatarSource: source,
        //   response: response
        // })
        // this.uploadImage(response.uri)
        //   .then(url => {
        //     alert('uploaded')
        //     this.setState({ image_uri: url })
        //   })
        //   .catch(error => console.log(error))
        // console.log(response.path)
        firebase
          .storage()
          .ref(`messageImages/${response.fileName}`)
          .put(response.path)
          .then((result) => {
            firebase
              .database()
              .ref(`users/${userID}`)
              .update({
                imageURL: result.downloadURL
              })
              .then((result) => {
                console.log('updated')
              })
              .catch((error) => {
                console.log('ERRORRRR', error)
              })
            this.setState(prevState => ({
              user: {
                ...prevState.user,
                imageURL: result.downloadURL
              }
            }))
          })
          .catch((error) => {
            console.log(error)
          })
        const userID = firebase.auth().currentUser.uid

      }
    })
  }
  render() {
    return (
      <ScrollView style={styleShow.container}>
        <View style={styleShow.avatar}>
          <Image
            borderRadius={50}
            source={this.state.user.imageURL ? { uri: this.state.user.imageURL } : require('../../assets/images/icon-user.png')}
            style={styleShow.imageStyle}
          />
          <TouchableOpacity
            onPress={this.showImage.bind(this)}
          >
            <Image
              style={{ width: 20, height: 20, tintColor: 'grey' }}
              source={require('../img/camera_icon.png')}
            />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold' }}>{this.state.user.name}</Text>
        </View>
        <View style={styleShow.content}>
          <View style={styleShow.tags}>
            <Image
              borderRadius={50}
              source={require('../../components/img/icon_user.png')}
              style={{ width: 45, height: 45 }} />

            <Text style={styleShow.txtInfo}>{firebase.auth().currentUser.email}</Text>
          </View>
          <View style={styleShow.tags}>
            <Image
              borderRadius={50}
              source={require('../../components/img/icon_phone.png')}
              style={{ width: 35, height: 35 }} />
            <Text style={styleShow.txtInfo}>{this.state.user.phoneNumber}</Text>
          </View>
        </View>
        <View style={styleShow.footer}>
          <TouchableOpacity
            style={styleShow.button}
            onPress={() => {
              this.props.navigation.navigate('list')
            }}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>Change Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut()
              chatHistory.reset()
              friendsStore.reset()
            }}
            style={styleShow.button}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

}

UserInfoScreen.defaultProps = {
  // icon
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
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9E9E9E'
  },
  content: {
    marginTop: 50,
    marginBottom: 50,
    flex: 1
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
    borderRadius: 10,
    alignItems: 'center'
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
  },
  txtInfo: {
    padding: 10,
    color: 'black',
    fontSize: 15,
  },
})