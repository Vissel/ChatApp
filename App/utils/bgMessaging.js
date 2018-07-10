import firebase from 'react-native-firebase'
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase'

export default async(message) => {
  // handle your message
  console.log('mess basckground', message)

  return Promise.resolve()
}