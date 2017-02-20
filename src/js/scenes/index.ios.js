import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import configureStore from '../store'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Scanner from './Scanner';
import BookInfo from './BookInfo';
import Douban from './Douban';
import BookList from './BookList';

const store = configureStore()

export default () => {
  const SCENES = {
    'fbook.SignInScene':    SignIn,
    'fbook.SignUpScene':    SignUp,
    'fbook.HomeScene':      Home,
    'fbook.ScannerScene':   Scanner,
    'fbook.BookInfoScene':  BookInfo,
    'fbook.DoubanScene':    Douban,
    'fbook.BookListScene':  BookList
  };

  Object.keys(SCENES).forEach((key) => {
    Navigation.registerComponent(key, () => SCENES[key], store, Provider);
  })
}