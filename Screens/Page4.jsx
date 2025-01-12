import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopNavbar from "../Components/TopNavbar";

export default function Page4() {

    return(
        <View style={styles.container} >
            <TopNavbar />
            <View style={styles.bodyX}>
                <Text style={styles.textX}>
                    Beautiful
                </Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#121212",
    },
    bodyX : {
        flex : 1, 
        backgroundColor : "white", 
        alignItems : "center", 
        justifyContent : "center", 
        width : "100%",

    },
    textX : {
        textAlign : "center"
    }
});