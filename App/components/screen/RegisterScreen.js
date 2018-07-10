import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import firebase from 'react-native-firebase'

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      confirmPassword: '',
      errorMessage: ''
    }
  }

  handleSignUp = async () => {

    if (this.state.password != this.state.confirmPassword) {
      // ToastAndroid.show("Làm ơn gõ đúng password", ToastAndroid.SHORT)
      this.setState({ errorMessage: 'Làm ơn gõ đúng password' })
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          this.props.navigation.navigate('Profile')
          user.displayName = this.state.name
          user.phoneNumber = this.state.phoneNumber
          // let userID = user.uid
          firebase.database().ref(`users/${user.uid}`)
            .set({
              name: this.state.name,
              email: this.state.email,
              phoneNumber: this.state.phoneNumber
            })
            .then(() => {
              console.log('succeed')
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  handleChangPassword = (t) => {
    this.setState({ password: t })
  }

  handleChangConfirmPassword = (t) => {
    this.setState({ confirmPassword: t })
  }

  render() {
    const { email, password, confirmPassword, errorMessage } = this.state
    return (
      <View style={style.container}>

        <View style={style.formInput}>
          <TextInput
            style={style.input}
            value={email}
            onChangeText={t => this.setState({ email: t })}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            placeholder='Email'
          />
          <TextInput
            style={style.input}
            onChangeText={fullName => this.setState({ name: fullName })}
            underlineColorAndroid='transparent'
            placeholder='Full name'
          />
          <TextInput
            style={style.input}
            secureTextEntry
            underlineColorAndroid='transparent'
            value={password}
            onChangeText={t => this.handleChangPassword(t)}
            placeholder='Password'
          />
          <TextInput
            style={style.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={t => this.handleChangConfirmPassword(t)}
            underlineColorAndroid='transparent'
            placeholder='Confirm password'
          />
          <TextInput
            underlineColorAndroid='transparent'
            style={style.input}
            type='number'
            onChangeText={text => this.setState({ phoneNumber: text })}
            placeholder='Phone number'
          />
          <Text>{errorMessage}</Text>
          <TouchableOpacity
            onPress={this.handleSignUp}
            style={style.button}
          >
            <Text style={style.textView}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  textView: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  input: {
    padding: 5,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'grey',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  button: {
    margin: 10,
    padding: 10,
    marginLeft: 90,
    marginRight: 90,
    backgroundColor: '#1565C0',
    borderRadius: 5,
    alignItems: 'center'
  },
  formInput: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  }
})
