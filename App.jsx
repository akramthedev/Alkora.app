import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import BottomNavbar from "./Components/BottomNavbar";

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor="#14111f"
        barStyle="light-content"  
      />
      <NavigationContainer>
        <BottomNavbar />  
      </NavigationContainer>
    </>
  );
}
