import React, { Component } from 'react'

import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { observer } from 'mobx-react'

import ItemHistory from './items/ItemHistory'
import chatHistory from '../../store/ChatHistoryStore'
import friendsStore from '../../store/FriendsStore'
@observer
export default class HistoryScreen extends Component {
  componentDidMount() {
    chatHistory.loadChatHistory()
    friendsStore.loadFriendsList()
  }

  render() {
    const { navigate } = this.props.navigation
    const user = friendsStore.friendsList
    console.log('HIStory', chatHistory.getHistory)
    console.log('HIStory', user)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
          style={{ backgroundColor: 'white', padding: 10 }}
          data={chatHistory.getHistory.slice()}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={{ shadowColor: 'grey' }}
              onPress={() => {
                navigate('BasicFlatist', {
                  name: item.user ? item.user.name : '',
                  chatID: item.key,
                  uid: item.user ? item.uid : '',
                  isOnline: item.user.isOnline,
                  imageURL: item.imageURL,
                  username: item.user.email,
                  phoneNumber: item.user.phoneNumber
                })
              }}
            >
              <ItemHistory
                imageURL={item.imageURL}
                name={item.user ? item.user.name : ' '}
                context={item.lastMessage}
                navigation={this.props.navigation}
                isOnline={item.user ? item.user.isOnline : false}
              />
              {/* <Text>{item.lastMessage}</Text> */}
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}
