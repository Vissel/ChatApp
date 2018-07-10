import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

import firebase from 'react-native-firebase'

class ItemChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: ''
    }
  }
  componentDidMount() {
    this.setState({
      userID: firebase.auth().currentUser.uid
    })
  }

  render() {
    const rightView = (
      <View style={{
        flex: 1,
        alignItems: 'flex-end',
      }}
      >
        <Text style={style.rightView}>{this.props.message}</Text>
        {/* <Text style={{ fontSize: 10 }}> {this.props.time} </Text> */}
        {/* show images on texts */}
        <View style={style.viewImages}>
          {this.props.images && this.props.images.length > 0 ?
            this.props.images.map((item) => (
              <Image
                style={style.imagesStyle}
                source={item.uri}
              />
            )) : null
          }
        </View>
      </View>
    )
    const leftView = (
      <View style={{
        flex: 1,
        alignItems: 'flex-start',
      }}>
        <Text style={style.leftView}>{this.props.message}</Text>
        {/* <Text style={{ fontSize: 10 }}> {this.props.time} </Text> */}
        <View style={style.viewImages}>
          {this.props.images && this.props.images.length > 0 ?
            this.props.images.map((item) => (
              <Image
                style={style.imagesStyle}
                source={item.uri} />
            )) : null
          }
        </View>
      </View>
    )
    return (
      this.state.userID !== this.props.senderID ? leftView : rightView
    );
  }
}

const style = StyleSheet.create({
  leftView: {
    color: 'black',
    backgroundColor: '#BDBDBD',
    borderRadius: 10,
    fontSize: 16, position: 'relative', marginBottom: 7, padding: 10,
    textShadowRadius: 5, includeFontPadding: false, textAlignVertical: 'center'
  },
  rightView: {
    color: 'black',
    backgroundColor: '#2196F3',
    borderColor: 'gray', borderRadius: 10,
    fontSize: 16, position: 'relative', marginBottom: 7, padding: 10,
    textShadowRadius: 5, includeFontPadding: false, textAlignVertical: 'center'
  },
  viewImages: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5
  },
  imagesStyle: { width: 150, height: 150, marginRight: 10 }
});

export default ItemChat;