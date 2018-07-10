import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './App/utils/bgMessaging'

AppRegistry.registerComponent('FloraMessenger', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
