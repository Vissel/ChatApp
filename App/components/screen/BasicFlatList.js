import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native'

import firebase from 'react-native-firebase'
import ItemChat from './items/ItemChat'
// import friendsStore from '../../store/FriendsStore';
// import { observer } from 'mobx-react';
// import { isolateGlobalState } from 'mobx/lib/core/globalstate';

const ImagePicker = require('react-native-image-picker')

// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

export default class BasicFlatList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('profile', {
              name: navigation.state.params.name,
              imageURL: navigation.state.params.imageURL,
              isOnline: navigation.state.params.isOnline,
              userName: navigation.state.params.username,
              phoneNumber: navigation.state.params.phoneNumber,
              uid: navigation.state.params.uid,
              chatID: navigation.state.params.chatID
            })
          }}
        >
          <View style={{ marginRight: 20 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/chatapp-98d0e.appspot.com/o/messageImages%2Fok.jpg?alt=media&token=c09f2f3c-cc8d-46fa-b7ac-ef1fedf13e46' }}
            />
            {navigation.state.params.isOnline && <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                position: 'absolute',
                top: 0,
                right: 0,
                marginRight: 0,
                borderColor: 'white',
                borderWidth: 1,
                backgroundColor: '#76FF03'
              }}
            />}
          </View>
        </TouchableOpacity>
        <Text style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          color: 'black'
        }}
        >{navigation.state.params.name}
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#40C4FF'
    },
    headerRight:
      <TouchableOpacity style={{ padding: 10 }}>
        <Image
          resizeMode='contain'
          style={{ width: 20, height: 20 }}
          source={require('../img/icon_more.png')}
        />
      </TouchableOpacity>
  })

  constructor(props) {
    super(props)
    this.state = {
      messageText: '',
      avatarSource: null,
      arrayMessage: [],
      senderID: '',
      response: null
    }
  }
  componentWillMount() {
    firebase.database().ref(`/chats/${this.props.navigation.state.params.chatID}`).child('messages')
      .on('child_added', (listMessages) => {
        this.setState({
          arrayMessage: [...this.state.arrayMessage, listMessages.val()]
        })
        console.log(listMessages.val())
      })
    firebase.database().ref(`/users/${this.props.navigation.state.params.uid}`)
      .on('value', (userChat) => {
        this.props.navigation.setParams({
          isOnline: userChat.val() ? userChat.val().isOnline : false
        })
        console.log("Onl", this.props.navigation.state.params.isOnline)
      })

    // firebase
    //   .storage()
    //   .ref('/messageImages/ok.jpg')
    //   .putFile('/storage/emulated/0/Pictures/image-adec175a-ab25-4385-8438-329c34e320b8.jpg')
    //   .on(
    //     firebase.storage.TaskEvent.STATE_CHANGED,
    //     (snapshot) => {
    //       console.log(snapshot.bytesTransferred)
    //       console.log(snapshot.totalBytes)
    //       if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
    //         console.log('complete')
    //       }
    //     },
    //     (error) => {
    //       unsubscribe()
    //       console.error(error)
    //     },
    // )
    // firebase
    //   .storage()
    //   .ref('/messageImages/')
    //   .child('ok.jpg')
    //   .getDownloadURL()
    //   .then((url)=>{
    //     console.log(url)
    //   })
    //   .catch((error)=>{
    //     console.log('not load')
    //   })
  }

  onSendBtnPressed() {
    if (this.state.messageText) {
      var imagesArray = []

      // this.state.arrayMessage.push({
      //   'senderID': firebase.auth().currentUser.uid + "",
      //   'message': this.state.messageText,
      //   'images': imagesArray.push({ uri: this.state.avatarSource })
      // })
      console.log(this.props.navigation.state.params.chatID)
      firebase.database().ref(`/chats/${this.props.navigation.state.params.chatID}`)
        .child('messages')
        .push(
          {
            senderID: firebase.auth().currentUser.uid,
            message: this.state.messageText,
            createAt: Math.floor(Date.now())
          }).then(() => {
            console.log('inserted')
          }).catch((error) => {
            console.log(error)
          })
      // console.log(this.state.messageArray.toString() + "")
      this.setState({ messageArray: this.state.messageArray })
      this.setState({ messageText: '' })
    }
  }

  render() {
    // console.log('UID',this.props.navigation.state.params.uid)
    // const uid = this.props.navigation.state.params.uid
    // this.props.navigation.setParams({isOnline: friendsStore.friendsObj[uid].isOnline})

    return (
      <KeyboardAvoidingView style={styles.container} {...Platform.OS == 'ios' ? { behavior: 'padding' } : null} >
        <View style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
          <FlatList
            style={{ padding: 10 }}
            data={this.state.arrayMessage}
            renderItem={({ item }) => (
              <ItemChat message={item.message} senderID={item.senderID} />
            )}
          />
        </View>

        <View style={styles.footer}>
          <View>
            <TouchableOpacity
              onPress={
                this.show.bind(this)
              }>
              <Image
                style={{ width: 15, height: 15, marginLeft: 15 }}
                source={require('../img/paperclip.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{
            flex: 1, alignSelf: 'stretch',
          }}>
            <TextInput
              style={styles.textBox}
              onChangeText={(messageText) => this.setState({ messageText })}
              value={this.state.messageText}
              underlineColorAndroid='transparent'
              placeholder='Write a message...' />
            <Image
              style={{ width: 25, height: 25 }}
              source={this.state.avatarSource}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.sendBtn} disabled={this.state.disabled}
              onPress={this.onSendBtnPressed.bind(this)}>
              <Image
                style={{ width: 50, height: 50, tintColor: 'blue' }}
                source={require('../img/icon_send.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView >
    )
  }
  show() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.fileName)

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
        const source = { uri: response.uri }
        this.setState({
          avatarSource: source,
        })
        // this.uploadImage(response.uri)
        //   .then(url => {
        //     alert('uploaded')
        //     this.setState({ image_uri: url })
        //   })
        //   .catch(error => console.log(error))
        // console.log(response.path)
        // firebase
        //   .storage()
        //   .ref('messageImages/' + response.name)
        //   .put(response)
        //   .then(() => {
        //     console.log('uploaded')
        //   })
        //   .catch(() => {
        //     console.log('not uploaded yet')
        //   });
      }
    })
  }
  // uploadImage(uri, mime = 'application/octet-stream') {
  //   return new Promise((resolve, reject) => {
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  //     let uploadBlob = null

  //     const imageRef = FirebaseClient.storage().ref('images').child('image_001')

  //     fs.readFile(uploadUri, 'base64')
  //       .then((data) => {
  //         return Blob.build(data, { type: `${mime};BASE64` })
  //       })
  //       .then((blob) => {
  //         uploadBlob = blob
  //         return imageRef.put(blob, { contentType: mime })
  //       })
  //       .then(() => {
  //         uploadBlob.close()
  //         return imageRef.getDownloadURL()
  //       })
  //       .then((url) => {
  //         resolve(url)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // }
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffff99',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBox: {
    alignSelf: 'stretch',
    borderRadius: 7,
    paddingBottom: 8,
    paddingTop: 8,
    textDecorationLine: 'none'
  },
  sendBtn: {
    padding: 5,
  }
})
