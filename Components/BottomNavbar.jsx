import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Animated, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import Home from '../Screens/Home';
import Page2 from '../Screens/Page2';
import Page3 from '../Screens/Page3';
import Page4 from '../Screens/Page4';


const TabArray = [
  { route: 'Home', label: 'Home', type: 'Ionicons', icon: 'football-outline', component: Home },
  { route: 'Page2', label: 'Page 2', type: 'Ionicons', icon: 'newspaper-outline', component: Page2 },
  { route: 'Page3', label: 'Page 3', type: 'Ionicons', icon: 'flame', component: Page3 },
  { route: 'Page4', label: 'Page 4', type: 'Ionicons', icon: 'settings-sharp', component: Page4 },
];

const Tab = createBottomTabNavigator();

const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef(new Animated.Value(0));
  const circleRef = useRef(new Animated.Value(0));
 
  const IconComponent = {
    Ionicons,
    FontAwesome,
  }[item.type];  

  useEffect(() => {
    Animated.timing(viewRef.current, {
      toValue: focused ? 1 : 0,
      duration: 167,
      useNativeDriver: true,
    }).start();

    Animated.timing(circleRef.current, {
      toValue: focused ? 1 : 0,
      duration: 167,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                scale: viewRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],  
                }),
              },
              {
                translateY: viewRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -15],  
                }),
              }
            ],
          },
        ]}
      >
        <View 
          style={[
            styles.btn, 
            focused ? { borderColor: "white" } : { borderColor : "transparent"}, 
            { backgroundColor: "transparent" }
          ]}
        >
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  {
                    scale: circleRef.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          />
          {IconComponent && (
            <IconComponent
              name={item.icon}
              size={22}
              color={focused ? "white" : "white"}
            />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};






export default function BottomNavbar() {
  return (
    <SafeAreaView
      style={{flex : 1,
        backgroundColor : "white"
       }}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
      
          {TabArray.map((item, index) => (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
   },
  tabBar: {
    height: 54,
    position: 'absolute',
    backgroundColor : "#1c1c2b",
    margin: 0,
    borderRadius: 0,
  },
  btn: {
    width: 58,
    height: 58,
    borderRadius: 40, 
    borderWidth: 8,
    borderColor: 'white',
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  "#1c1c2b",
    borderRadius: 50,
  },
});
