import { observable, action, computed } from 'mobx'
import firebase from 'react-native-firebase'
import friendsStore from './FriendsStore'

class ChatHostoryStore {
  @observable history = {}
  listener = null

  @action loadChatHistory() {
    const user = firebase.auth().currentUser
    if (!this.listener) {
      this.listener = firebase.database().ref(`/history/${user.uid}`).orderByChild('timestamp').on('value', (snapshot) => {
        console.log(snapshot)
        this.history = snapshot.val() ? snapshot.val() : {}
      })
    }
  }

  @computed get getHistory() {
    let result = []
    result = Object.entries(this.history).map((item) => {
      return this.parseSnap(item)
    })

    return result
  }

  @action reset() {
    this.listener = null
    this.history = {}
  }

  loadInfoUser(chatId) {
    const user = firebase.auth().currentUser
    firebase.database().ref(`/chats/${chatId}`).child('key').once('value', (snap) => {
      let uids = snap.val().split('|')
      if (uids && uids.length > 0) {
        console.log('uid', uids)
        uids = uids.filter(uid => uid != user.uid)
      }
      console.log('UID: ', uids)
      // result = uids[0]
      this.history[chatId].user = friendsStore.friendsObj[uids[0]]
      console.log('USERRR', friendsStore.friendsObj[uids[0]])
    })
  }

  parseSnap(obj) {
    const user = firebase.auth().currentUser
    const result = {}
    result.key = obj[0]
    result.lastMessage = obj[1].lastMessage
    result.timestamp = obj[1].timestamp
    let uids = obj[1].key.split('|')
    if (uids && uids.length > 0) {
      console.log('uid', uids)
      uids = uids.filter(uid => uid != user.uid)
    }
    result.uid = uids[0]
    result.user = friendsStore.friendsObj[uids[0]]
    console.log('user123', result.user)
    // this.loadInfoUser(obj[0])
    return result
  }

}

const chatHistory = new ChatHostoryStore()
export default chatHistory
