import React, { Component } from 'react'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'
import firebase from 'react-native-firebase'
// import type { RemoteMessage } from 'react-native-firebase';
// import type { Notification } from 'react-native-firebase';
// import type { Notification, NotificationOpen } from 'react-native-firebase';

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.High)
      .setDescription('My apps test channel')

    // Create the channel
    firebase.notifications().android.createChannel(channel)
    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('noti1', notification)
    })
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log('noti2', notification)
      const noti = new firebase.notifications.Notification()
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setBody(notification.body)
        .setData(notification.data)
        .setSound('default')
      noti
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High)
      firebase.notifications().displayNotification(noti)
    })
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const { action, notification } = notificationOpen
      // Get information about the notification that was opened
      console.log('OPEN:', notification)
    })
    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const { action, notification } = notificationOpen
          console.log('backgroud open')
        }
      })
  }

  componentWillUnmount() {
    if (this.messageListener) {
      this.messageListener()
    }
    this.notificationOpenedListener()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // this.props.navigation.navigate(false ? 'App' : 'Auth')
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'App' : 'Auth')
      if (user) {
        firebase.database().ref('.info/connected').on('value', (snap) => {
          if (snap.val()) {
            const userref = firebase.database().ref(`/users/${user.uid}`).child('isOnline')
            userref.onDisconnect().set(false)
            userref.set(true)
          }
        })
        firebase.messaging().getToken()
          .then((fcmToken) => {
            if (fcmToken) {
              // user has a device token
              console.log('TOKEN: ', fcmToken)
              firebase.database().ref(`/users/${user.uid}/token`).child(fcmToken).set(true)
            } else {
              // user doesn't have a device token yet
              console.log('TOKEN ERR')
            }
          })
        this.messageListener = firebase.messaging().onMessage((message) => {
          // Process your message as required
          console.log('Message: ', message)
        })
      }
    })

    // this.props.navigation.navigate('NewsContent')
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
