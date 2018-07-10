import { observable, action, computed, reaction } from 'mobx'
import firebase from 'react-native-firebase'

class FriendsStore {
  @observable friends = {}
  listener = null

  @action loadFriendsList() {
    const user = firebase.auth().currentUser
    if (!this.listener) {
      this.listener = firebase.database().ref(`/friends/${user.uid}`).on('value', (snap) => {
        console.log('friends: ', snap.val())
        this.friends = {}
        Object.keys(snap.val() ? snap.val() : {}).map((uid) => {
          firebase.database().ref(`/users/${uid}`).once('value', (user) => {
            console.log('user: ', user.val())
            const result = {}
            result[uid] = user.val()
            console.log(result)
            this.friends = Object.assign(result, this.friends)
          })
        })
      })
      // this.loadOnline()
    }
  }

  @action reset() {
    this.listener = null
    this.friends = {}
  }

  @action loadOnline = reaction(
    () => this.friends,
    (friends) => {
      Object.keys(friends).map((uid) => {
        firebase.database().ref(`/users/${uid}`).child('isOnline').on('value', (user) => {
          console.log('isOnline: ', user.val())
          this.friends[uid].isOnline = user.val()
        })
      })
    }
  )

  @computed get friendsList() {
    let result = []
    result = Object.entries(this.friends).map((item) => {
      return this.parseSnap(item)
    })

    return result
  }

  @computed get friendsObj() {
    return this.friends
  }

  parseSnap(obj) {
    let result = {}
    result.key = obj[0]
    result = Object.assign({ key: obj[0], ...obj[1] }, result)
    return result
  }
}

const friendsStore = new FriendsStore()
export default friendsStore
