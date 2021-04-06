import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Season = ({ type, title }) => {
  
  let background = "";
  let icon = "";

  if (type === "summer") {
    background = "#ffdf00";
    icon = "sun";
  } else if (type === "spring") {
    background = "#00ff00";
    icon = "seedling";
  } else if (type === "fall") {
    background = "#f59622";
    icon = "canadian-maple-leaf";
  } else if (type === "winter") {
    background = "#20e9ff";
    icon = "snowflake";
  }else{
    background ="black",
    icon = "skull"
    title="none"
}

  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      <Icon name={icon} style={{color: background,marginTop:3,marginRight: 10,fontSize:17,}} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    marginTop:6,
    margin: 3,
    padding: 6,
    flexDirection: "row",
  },

  icon: {
    marginTop:3,
    marginRight:6,
    fontSize:20,
  },

  text:{
      //color: "white",
      fontSize:15,
  },
});

export default Season;