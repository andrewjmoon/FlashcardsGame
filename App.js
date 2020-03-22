import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './views/DeckList';
import reducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
import { blue, white, salmon } from './utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { AddDeck, DeckView, AddCard, Quiz, About, Reset } from './views';
import { setLocalNotification } from './utils/notifications';

const enhancers = [applyMiddleware(thunk, logger)];

const store = createStore(reducer, compose(...enhancers));

function ProjectStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const tabNavigatorConfig = {
  navigationOptions: {
    headerShown: false
  },
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    activeTintColor: blue,
    style: {
      height: 60,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      }
    },
    labelStyle: {
      fontSize: 20
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    showIcon: true
  }
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="collections" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'AddDeck',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="create" size={30} color={tintColor} />
        )
      }
    },
    Reset: {
      screen: Reset,
      navigationOptions: {
        tabBarLabel: 'Reset',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="aspect-ratio" size={30} color={tintColor} />
        )
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        tabBarLabel: 'About',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="dock" size={30} color={tintColor} />
        )
      }
    }
  },
  tabNavigatorConfig
);

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: TabNavigator
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        }
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Add Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          backgroundColor: blue
        }
      }
    }
  },
  { headerTitleAlign: 'center' }
);

const Stacks = createAppContainer(StackNavigator);

export default function App() {
  useEffect(() => {
    setLocalNotification();
  });

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <ProjectStatusBar backgroundColor={salmon} barStyle={'light-content'} />
        <Stacks />
      </View>
    </Provider>
  );
}
