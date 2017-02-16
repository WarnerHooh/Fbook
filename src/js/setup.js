import React from 'react'
import { Navigation } from 'react-native-navigation';

import { iconsLoaded } from './utils/appIcons';

import registerScreens from './scenes';

registerScreens();

const screen = {
  screen: 'fbook.SignInScene',
    title: 'Sign In',
    navigatorStyle: {
    navBarHidden: true
  },
}

iconsLoaded.then(() => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'fbook.HomeScene',
      navigatorStyle: {
        navBarHidden: true
      },
    },
    passProps: {
    },
  });
});
