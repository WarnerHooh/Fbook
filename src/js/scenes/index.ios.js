import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation';

import configureStore from '../store'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Scanner from './Scanner';
import ScanResult from './ScanResult';
import BookInfo from './BookInfo';
import BookList from './BookList';
import UserInfo from './UserInfo';
import Search from './Search';
import BorrowedLentList from './BorrowedLentList';

const store = configureStore()

export default () => {
  const SCENES = {
    'fbook.SignInScene':            SignIn,
    'fbook.SignUpScene':            SignUp,
    'fbook.HomeScene':              Home,
    'fbook.ScannerScene':           Scanner,
    'fbook.ScanResultScene':        ScanResult,
    'fbook.BookInfoScene':          BookInfo,
    'fbook.BookListScene':          BookList,
    'fbook.UserInfoScene':          UserInfo,
    'fbook.SearchScene':            Search,
    'fbook.BorrowedLentListScene':  BorrowedLentList,
  };

  Object.keys(SCENES).forEach((key) => {
    Navigation.registerComponent(key, () => SCENES[key], store, Provider);
  })
}