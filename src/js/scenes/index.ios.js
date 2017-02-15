import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import configureStore from '../store'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Scanner from './Scanner';
import BookInfo from './BookInfo';

const store = configureStore()

export default () => {
  Navigation.registerComponent('fbook.SignInScene', () => SignIn, store, Provider);
  Navigation.registerComponent('fbook.SignUpScene', () => SignUp, store, Provider);
  Navigation.registerComponent('fbook.HomeScene', () => Home, store, Provider);
  Navigation.registerComponent('fbook.ScannerScene', () => Scanner, store, Provider);
  Navigation.registerComponent('fbook.BookInfoScene', () => BookInfo, store, Provider);
}