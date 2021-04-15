import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Type = ({ type, title }) => {
  
  let background = "";
  let icon = "";

  if (type === "TV") {
    background = "#1708bd";
    icon = "tv";
  } else if (type === "OVA") {
    background = "#ff0000";
    icon = "galactic-republic";
  }else if (type === "anime") {
    background = "#ff0000";
    icon = "tv";
  } else if (type === "Movie") {
    background = "#c78214";
    icon = "film";
  } else if (type === "Ona") {
    background = "#7a1380";
    icon = "person-booth";
  }else if (type === "Music") {
    background = "#008015";
    icon = "music";
  }else if (type === "Special") {
    background = "#b5b82a";
    icon = "star";
  }else{
      background ="#000000",
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

export default Type;