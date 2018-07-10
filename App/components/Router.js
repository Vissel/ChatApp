import React from 'react'
import { Platform, Image } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'

import UserInfoScreen from './screen/UserInfoScreen'
import Home from './screen/Home'
import LoginScreen from './screen/LoginScreen'
import RegisterScreen from './screen/RegisterScreen'
import AuthLoadingScreen from './screen/AuthLoadScreen'
import BasicFlatist from './screen/BasicFlatList'
import HistoryScreen from './screen/HistoryScreen'
import ContactScreen from './screen/ContactScreen'
import ProfileScreen from './screen/ProfileScreen'
import TestFunc from './screen/TestFunc'

const historyStack = createStackNavigator({
  history: {
    screen: HistoryScreen,
    navigationOptions: {
      title: 'Message',
      headerStyle: {
        backgroundColor: '#40C4FF'
      }   
    }
  },
  profile: {
    screen: ProfileScreen
  }
})
const contactStack = createStackNavigator({
  contact: {
    screen: ContactScreen,
    navigationOptions: {
      title: 'Contact',
      headerStyle: {
        backgroundColor: '#40C4FF'
      }
    }
  },
  profile: {
    screen: ProfileScreen
  }
})
const accountStack = createStackNavigator({
  account: {
    screen: UserInfoScreen,
    navigationOptions: {
      title: 'Your profile',
      headerStyle: {
        backgroundColor: '#40C4FF'
      }
    }
  }
})

const HomeStack = createBottomTabNavigator(
  {
    PostTab: {
      screen: historyStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => <Image source={require('./img/message.png')} style={{ tintColor, width: 24, height: 24 }} />,
        tabBarLabel: 'Message'
      }
    },
    ContactTab: {
      screen: contactStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => <Image source={require('./img/icon_contact.png')} style={{ tintColor, width: 24, height: 24 }} />,
        tabBarLabel: 'Contact'
      }
    },
    AccountTab: {
      screen: accountStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => <Image source={require('./img/friend.png')} style={{ tintColor, width: 24, height: 24 }} />,
        tabBarLabel: 'Profile'
      }
    },
    TestFuncTab: {
      screen: TestFunc,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => <Image source={require('./img/friend.png')} style={{ tintColor, width: 24, height: 24 }} />,
        tabBarLabel: 'Tài khoản'
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        margin: 0
      },
      style: {
        backgroundColor: 'white'
      }
    }
  }
)

const AppStack = createStackNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      header: null
    }
  },
  BasicFlatist: {
    screen: BasicFlatist,
  }
})

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      statusBarStyle: 'light-content',
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: 'white'
      }
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: 'white'
      }
    }
  }
})

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default SwitchNavigator
