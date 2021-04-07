/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Trilon from './src/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Trilon);
