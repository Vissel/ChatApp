import React, { Component } from 'react'

import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { observer } from 'mobx-react'
import friendsStore from '../../store/FriendsStore'
import ItemContact from './items/ItemContact'
import chatHistory from '../../store/ChatHistoryStore'

@observer
export default class ContactScreen extends Component {
  componentDidMount() {
    chatHistory.loadChatHistory()
    friendsStore.loadFriendsList()
  }
  render() {
    const user = friendsStore.friends
    console.log('Freind,', user)
    const { navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
        <FlatList
          style={{ backgroundColor: 'white' }}
          data={friendsStore.friendsList.slice()}
          renderItem={({ item }) =>
            <TouchableOpacity
              onPress={() => {
                navigate('BasicFlatist', {
                  name: item.name,
                  isOnline: item.isOnline,
                  imageURL: item.imageURL,
                  chatID: '',
                  uid: item.uid,
                  username: item.email,
                  phoneNumber: item.phoneNumber
                })
              }}
            >
              <ItemContact
                name={item.name}
                navigation={this.props.navigation}
                isOnline={item.isOnline}
              />
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}
