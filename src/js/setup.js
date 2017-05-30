import React from 'react'
import { Navigation } from 'react-native-navigation';

import registerScreens from './scenes';

registerScreens();

const screen = {
  screen: 'fbook.SignInScene',
  title: 'Sign In',
  navigatorStyle: {
    navBarHidden: true
  },
}

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Home',
      screen: 'fbook.HomeScene',
      icon: require('../image/home.png'),
      selectedIcon: require('../image/home.png'),
      title: 'Home',
      navigatorStyle: {
        navBarHidden: true
      },
      navigatorButtons: {}
    },
    {
      label: 'Record',
      screen: 'fbook.BorrowedListScene',
      icon: require('../image/record.png'),
      selectedIcon: require('../image/record.png'),
      title: 'Record List'
    },
    {
      label: 'Books',
      screen: 'fbook.BookListScene',
      icon: require('../image/owned-books.png'),
      selectedIcon: require('../image/owned-books.png'),
      title: 'My Books'
    },
    {
      label: 'Personal',
      screen: 'fbook.UserInfoScene',
      icon: require('../image/personal-24.png'),
      selectedIcon: require('../image/personal-24.png'),
      title: 'Personal',
      navigatorStyle: {
        navBarHidden: true
      },
    }
  ],
  appStyle: {
    orientation: 'portrait'
  },
});
