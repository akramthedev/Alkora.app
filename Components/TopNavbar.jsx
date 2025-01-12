import React,{useState} from "react";
import { View, Text, StyleSheet,Image, TouchableOpacity, TextInput  } from "react-native";
import { Ionicons,Entypo } from "@expo/vector-icons";
import LiveButton from "./LiveButton";
import { useFonts } from 'expo-font';


const TopNavbar = ({setisCLickedOne, isCLickedOne, toggleHeight, isChevronClicked }) => {

    const [fontsLoaded] = useFonts({
      'fontR': require('../fonts/fontR.ttf'),  
      'fontM': require('../fonts/fontM.ttf'),  
      'fontB': require('../fonts/fontB.ttf'),  
    });
   
    
    const [isClicked, setIsClicked] = useState(false);
    const [isSearchClicked, setisSearchClicked] = useState(false);



    if (!fontsLoaded) {
        return null;  
    }

  return (
    <View style={styles.topNavBar}>

      


<View style={styles.rightSection}>
      {
        isSearchClicked ? 
        <>
          <TextInput
            style={{
              fontFamily : "fontR",
              color : "gray", 
              fontSize : 16
            }}
            placeholder="إبحث..."
            placeholderTextColor="gray"
          />
        </>
        :
        <TouchableOpacity
            style={{
              flexDirection : "row", 
              alignItems : "center"
            }}
            onPress={()=>{
              setisCLickedOne(!isCLickedOne);
            }}
        >
          <Text style={styles.appTitle}>الكورة</Text>
          <Image
              source={require('../assets/logo.png')}  
              style={{ width: 32, height: 32 }}       
          />
        </TouchableOpacity>
      }
      </View>




      <View style={styles.containerOfButtons}>
      {
        isSearchClicked ? 
        <View>
          <View style={styles.buttonContainer}  >
            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={()=>{
                setisSearchClicked(!isSearchClicked);
              }}
            >
              <Ionicons name="close" size={23} color="white" />
            </TouchableOpacity>
          </View>
          
        </View>
        :
        <>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonXI}
              onPress={()=>{
                toggleHeight();
              }}
            >
            {
              isChevronClicked ? 
              <Ionicons name="chevron-up" size={25} color="white" />
              :
              <Ionicons name="chevron-down" size={25} color="white" />
            }
            </TouchableOpacity>
          </View>


          <View style={styles.buttonContainer}  >
            <TouchableOpacity
              style={styles.buttonSearch}
              onPress={()=>{
                setisSearchClicked(!isSearchClicked);
              }}
            >
              <Ionicons name="search" size={23} color="white" />
            </TouchableOpacity>
          </View>


          <View style={[styles.buttonContainer2, isClicked && styles.buttonContainer3]}>
            <LiveButton 
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          </View>

          {
            !isClicked && 
            <View style={styles.buttonContainer}>
              <Entypo name="calendar" size={20} color="white" />
            </View>
          }
          

        </>
      }
      </View>

      

     
      
    </View>
  );
};

const styles = StyleSheet.create({
  topNavBar: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 13,
    paddingLeft: 13,
    height : 69,
    backgroundColor: "#181424", 
  },
  appTitle: {
    color: "white",
    fontSize: 19,
    fontFamily : "fontB",
    marginRight: 8,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  liveBadge: {
    backgroundColor: "#3E3E3E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  liveText: {
    color: "white",
    fontSize: 14,
  },
  containerOfButtons : {
    flexDirection : "row",
    justifyContent : "center"
  },
  buttonContainer: {
    height: 40,
    justifyContent: "center",  
    alignItems: "center",  
    marginRight: 15,  
  },
  buttonContainer2: {
    height: 40,
    justifyContent: "center",  
    alignItems: "center",  
    marginRight: 22,
    marginLeft : 22  
  },
  buttonContainer3 : {
    height: 40,
    justifyContent: "center",  
    alignItems: "center",  
    marginRight: 20,
    marginLeft : 6  
  },
});

export default TopNavbar;
