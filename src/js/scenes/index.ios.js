import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import configureStore from '../store'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Scanner from './Scanner';
import BookInfo from './BookInfo';
import BookList from './BookList';
import UserInfo from './UserInfo';

const store = configureStore()

export default () => {
  const SCENES = {
    'fbook.SignInScene':    SignIn,
    'fbook.SignUpScene':    SignUp,
    'fbook.HomeScene':      Home,
    'fbook.ScannerScene':   Scanner,
    'fbook.BookInfoScene':  BookInfo,
    'fbook.BookListScene':  BookList,
    'fbook.UserInfoScene':  UserInfo
  };

  Object.keys(SCENES).forEach((key) => {
    Navigation.registerComponent(key, () => SCENES[key], store, Provider);
  })
}