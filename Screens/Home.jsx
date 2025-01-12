import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  I18nManager,
  Image,
  Animated, 
  Easing 
} from "react-native";
import TopNavbar from "../Components/TopNavbar";
import SkeletonLoader from '../Components/SkeletonLoader';
import LiveMatch from "../Components/CircularProgress";
import ScoreDisplay from '../Components/ScoreDisplay';
import { useFonts } from "expo-font";
import leaguesData from '../Data/games';
import daysData from "../Data/days";
import DataLeaguesNavbar from '../Data/DataLeaguesNavbar';

I18nManager.forceRTL(false);
I18nManager.allowRTL(false);



export default function Home() {

  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(58);
  const [isLoading, setIsLoading] = useState(true);
  const [isCLickedOne, setisCLickedOne] = useState(true);
  const [isChevronClicked, setIsChevronClicked] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const today = new Date().getDate();  


  const getDayLabel = (day) => {
    if (day === today) return "اليوم";  
    if (day === today - 1) return "أمس"; 
    if (day === today + 1) return "غدًا";  
    return "";  
  };

  const toggleHeight = () => {
    setIsChevronClicked(!isChevronClicked);
    Animated.timing(animatedHeight, {
      toValue: isChevronClicked ? 0 : 55,  
      duration: 999, 
      easing: Easing.out(Easing.ease),  
      useNativeDriver: false,  
    }).start();
  };

  useEffect(() => {
    const index = daysData.findIndex((day) => day.day === activeDay);
    if (index !== -1 && scrollRef.current) {
      const centerOffset = (scrollViewWidth - itemWidth) / 2;
      const scrollPosition = index * (itemWidth + 10) - centerOffset;
      scrollRef.current.scrollTo({
        x: scrollPosition > 0 ? scrollPosition : 0,
        animated: false,
      });
    }
  }, [scrollViewWidth]);


  useEffect(() => {
    if (animatedHeight) {
      setTimeout(() => {
        scrollRef2.current?.scrollToEnd({ animated: false });
      }, 100);  
    }
  }, [animatedHeight]);


  useEffect(()=>{
    
    setIsLoading(true);

    const demoLoaderSkl = ()=>{
      setTimeout(()=>{
        setIsLoading(false);
      }, 2500);
    }
    demoLoaderSkl();
  }, [isCLickedOne]);


  
  const [fontsLoaded] = useFonts({
    fontR: require("../fonts/fontR.ttf"),
    fontM: require("../fonts/fontM.ttf"),
    fontB: require("../fonts/fontB.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      
      <TopNavbar 
        setisCLickedOne={setisCLickedOne}
        isCLickedOne={isCLickedOne}
        toggleHeight={toggleHeight}
        isChevronClicked={isChevronClicked}
      />

      
      <Animated.View
        style={{
          height: animatedHeight,
          overflow: "hidden", 
          backgroundColor: "#1c1c2b", 
        }}
      >
        <ScrollView
          ref={scrollRef2}
          horizontal
          style={{
            flexGrow: 0,  
            paddingHorizontal: 0, 
            backgroundColor: "#1c1c2b",
            height : "100%",
            borderColor : "#40375e",
            borderTopWidth : 1,
          }}
          contentContainerStyle={{
            alignItems: "center",  
          }}
          showsHorizontalScrollIndicator={false}
        >

        {
          DataLeaguesNavbar.map((league, index)=>{
            return(
              <TouchableOpacity
                key={index}
                style={{ 
                    height : 33,
                    alignItems : "center",
                    justifyContent : "center",
                    borderRadius : 50,
                    paddingRight : 5, 
                    paddingLeft : 10,  
                    width : 'auto', 
                    backgroundColor : "#383d59", 
                    marginLeft : 5, 
                    marginRight : 5, 
                    flexDirection : "row"
                  }}
              >
                <Text 
                  style={{
                    width : "auto", 
                    textAlign : "right", 
                    color : "white", 
                    fontFamily : "fontR",
                    fontSize : 12.7
                  }}
                >
                  {
                    league.name
                  }    
                </Text>
                <Image 
                  source={{
                    uri : league.image
                  }}
                  style={{ 
                    width: 25, 
                    height: 25, 
                    resizeMode: "cover",
                    marginLeft : 7 , 
                    backgroundColor : "#626783",
                    borderRadius : 30 }}
                />
              </TouchableOpacity>
            )
          })
        }

        </ScrollView>
      </Animated.View>



      <View style={styles.containerOne}>
        <ScrollView
          horizontal
          style={styles.dateSelector}
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          onLayout={(event) => {
            setScrollViewWidth(event.nativeEvent.layout.width);
          }}
        >
          {daysData.map(({ day, name }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setisCLickedOne(!isCLickedOne);
                setActiveDay(day);
                const centerOffset = (scrollViewWidth - itemWidth) / 2;
                const scrollPosition = index * (itemWidth + 10) - centerOffset;
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    x: scrollPosition > 0 ? scrollPosition : 0,
                    animated: true,
                  });
                }
              }}
              style={[
                styles.dateContainer,
                activeDay === day && styles.activeDateContainer,
              ]}
            >
              <Text
                style={activeDay === day ? styles.dateText : styles.dateTextBlack}
              >
                يناير
              </Text>
              <Text
                style={
                  activeDay === day ? styles.dateText2 : styles.dateText2Black
                }
              >
                {day}
              </Text>
              <Text
                style={activeDay === day ? styles.dateText : styles.dateTextBlack}
              >
                {getDayLabel(day) || name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>



      {
        isLoading ? 
        <SkeletonLoader/>
        :
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          {leaguesData.map((league, leagueIndex) => (
            <View key={leagueIndex} style={styles.card}>   
              <View style={styles.rowOne}>
                <Text style={styles.leagueTitle}>{league.leagueName}</Text>
                <Image
                  source={{ uri : league.leagueLogo }} 
                  style={{ width: 32, height: 32, resizeMode: "contain", borderRadius: 10 }}
                />
              </View>

              {league.matches.map((match, matchIndex) => (
                <View key={matchIndex} style={[styles.rowTwo, league.matches.length && styles.addBorderBottom ]}>
                  <View style={styles.containerFirstTeam}>
                    <Text style={styles.NameTeam}>{match.firstTeam.name}</Text>
                    <View style={styles.containerLogoTeam}>
                      <Image
                        source={{ uri: match.firstTeam.logo }}
                        style={{ width: 31, height: 31, resizeMode: "contain" }}
                      />
                    </View>
                  </View>


                  <View style={styles.timeContainer}>
                  {
                    match.state === "Live" ? 
                    <LiveMatch
                      match={{
                        state: "Live",
                        score : match.score,
                        time: match.time, 
                        firstTeam: { name: match.firstTeam.name, logo: match.firstTeam.logo },
                        secondTeam: { name: match.secondTeam.name, logo: match.secondTeam.logo },
                      }}
                    />
                    :
                    match.state === "Completed" ? 
                    <ScoreDisplay score={match.score} time={match.time} />
                    :
                    <View style={styles.timeContainer} >
                      <Text style={styles.timeContainerText}>
                        {
                          match.time
                        }
                      </Text>
                    </View>
                  }
                  </View>


                  <View style={styles.containerSecondTeam}>
                    <View style={styles.containerLogoTeam2}>
                      <Image
                        source={{ uri: match.secondTeam.logo }}
                        style={{ width: 31, height: 31, resizeMode: "contain" }}
                      />
                    </View>
                    <Text style={styles.NameTeam1}>{match.secondTeam.name}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  containerOne: {
    height: 86,
  },
  dateSelector: {
    paddingTop: 3,
    paddingBottom: 3,
    height: 74,
    backgroundColor: "white",
  },
  dateContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    marginHorizontal: 5,
    alignItems: "center",
    width: 58,
    height: 74,
  },
  activeDateContainer: {
    backgroundColor: "#1c1c2b",
    borderRadius: 9,
  },
  dateText2: {
    color: "#FFF",
    fontSize: 17,
    fontWeight : "500",
  },
  dateText2Black : {
    color: "black",
    fontWeight : "500",
    fontSize: 17,
  },
  dateTextBlack : {
    color: "gray",
    fontSize: 10.55,
    fontFamily: "fontR",
  },
  dateText: {
    color: "#FFF",
    fontSize: 10.55,
    fontFamily: "fontR",
  },
  body: {
    flex: 1,
    paddingTop: 10, 
    marginBottom : 54,
    backgroundColor: "white",
  },
  card: {
    backgroundColor: "#f8f4f4",  
    margin: 0,
    borderRadius: 13,
    marginRight: 9,
    marginLeft: 9,
    shadowColor: "gray", 
    shadowOffset: { width: 0, height: 1 },  
    shadowOpacity: 0.07,  
    shadowRadius: 6,  
    elevation: 5, 
    borderColor: "transparent",
    overflow: "hidden",
    marginBottom: 18,  
  },
  leagueTitle: {
    fontSize: 14,
    marginBottom: 10,
    textAlign : "right",
    paddingRight : 10,
    flex : 1,
    alignItems : "center",
    fontFamily : "fontB"
  },
  rowTwo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    minHeight: 53,
    height: "auto",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop : 6, 
    paddingBottom : 6,
  },
  
  addBorderBottom : {
    borderBottomWidth: 1, 
    borderBottomColor: "#f7f7f7",
    borderStyle: "solid",
  },

  navItem: {
    padding: 10,
  },
  rowOne : {
    flexDirection : "row",
    paddingRight : 11, 
    paddingLeft : 11,
    paddingTop : 6, 
  },
  containerFirstTeam : {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",  
    flexShrink: 0, 
    flexGrow: 0,
  }, 
  containerSecondTeam : {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",  
    flexShrink: 0, 
    flexGrow: 0,  
  },
  timeContainer : {
    width : 100,
    alignItems : "center",
    justifyContent : "center",
    flexDirection : "column"
  }, 
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,  
    height: 50,
    borderRadius: 25,  
    borderWidth: 3,  
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainerText : {
    color : "gray",
    alignItems : "center",
    justifyContent :"center", 
    fontSize : 13, 
    fontWeight : "600"
  },  
  containerLogoTeam : {
    height : 33, 
    width : 33, 
    marginLeft : 7,
    alignItems : "center",
    justifyContent :"center"
  },
  containerLogoTeam2 : {
    height : 33, 
    width : 33, 
    marginRight : 7,
    alignItems : "center",
    justifyContent :"center"
  },
  NameTeam : {
    fontFamily: "fontB",
    fontSize: 13,
    textAlign: "right",
    flex: 1, 
    flexWrap: "wrap", 
  },
  NameTeam1 : {
    fontFamily: "fontB",
    fontSize: 13,
    textAlign: "left",
    flex: 1, 
    flexWrap: "wrap", 
  },
  liveText: {
    color: "red",
    fontWeight: "bold",
  },
  
});
