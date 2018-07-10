import React, { Component } from 'react'

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import firebase from 'react-native-firebase'

// import * as firebase from 'firebase';

export default class LoginScreen extends Component {
  // componentWillMount(){
  //   var config = {
  //     apiKey: "AIzaSyDXGjPsqh9I7YbNZ2bnYvX4X_xHeZnZpxk",
  //     authDomain: "chatappdemo-33667.firebaseapp.com",
  //     databaseURL: "https://chatappdemo-33667.firebaseio.com",
  //     projectId: "chatappdemo-33667",
  //     storageBucket: "chatappdemo-33667.appspot.com",
  //     messagingSenderId: "2683960465"
  //   };
  //   firebase.initializeApp(config);

  //   firebase.database().ref('users/001').set(
  //     {
  //       name:"Tri",
  //       age:22
  //     }
  //   ).then(()=>{
  //     console.log('inserted');
  //   }).catch((error)=>{
  //     console.log(error);
  //   });
  // }
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleLogin = async() => {
    const { email, password } = this.state
    if (this.state.email == '') {
      this.setState({ errorMessage: 'Please enter email!' })
    }
    if (this.state.password == '') {
      this.setState({ errorMessage: 'Please enter password' })
    }
    if (this.state.email != '' && this.state.password != '') {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  render() {
    const { navigate } = this.props.navigation
    const { email, password, errorMessage } = this.state
    return (
      <View style={style.container}>
        <View style={style.content}>
          <View style={style.banner}>
            <Image
              source={require('../../assets/images/chat_app.jpg')}
              style={style.imageStyle}
            />
          </View>
          <View style={style.formInput}>
            <TextInput
              style={style.input}
              value={email}
              onChangeText={t => this.setState({ email: t })}
              underlineColorAndroid='transparent'
              placeholder='Email'
            />
            <TextInput
              style={style.input}
              secureTextEntry
              value={password}
              onChangeText={t => this.setState({ password: t })}
              underlineColorAndroid='transparent'
              placeholder='Password'
            />
            <TouchableOpacity
              onPress={() => {
                this.handleLogin()
              }}
              style={style.button}
            >
              <Text style={style.textView}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate('register')
              }}
              style={{ alignItems: 'center' }}
            >
              <Text style={{ color: '#1565C0', fontSize: 15 }}>Forgot your password.</Text>
              <Text style={{ color: 'red', marginTop: 20 }}>{errorMessage}</Text>
            </TouchableOpacity>
          </View>
          <View style={style.footer}>
            <TouchableOpacity
              onPress={() => {
                navigate('Register')
              }}
              style={{
                margin: 10,
                padding: 10,
                marginRight: 25,
                marginLeft: 25,
                alignItems: 'center',
                borderColor: '#1565C0',
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderRadius: 10
              }}
            >
              <Text style={{ color: '#1565C0', fontSize: 20, textAlign: 'center' }}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textView: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  input: {
    padding: 5,
    margin: 5,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 10,
    borderColor: 'grey',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  button: {
    margin: 10,
    padding: 10,
    marginRight: 25,
    marginLeft: 25,
    backgroundColor: '#1565C0',
    borderRadius: 10,
    alignItems: 'center'
  },
  formInput: {
    flex: 1,
  },
  banner: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    justifyContent: 'center'
  },
  imageStyle: {
    width: 100,
    height: 100,
  }
})
