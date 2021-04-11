import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Season = ({ type, title }) => {
  
  let background = "";
  let icon = "";

  if (type > 8 ) {
    background = "#008015";
    icon = "grin-stars";
  } else if (type > 7 ) {
    background = "#1708bd";
    icon = "smile-beam";
  } else if (type >  6 && type > 5 ) {
    background = "#000000";
    icon = "meh";
  } else if (type > 4 && type > 0) {
    background = "#ff0000";
    icon = "frown-open";
  }else{
    background ="#000000",
    icon = "skull"
    
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
    marginRight:3,
    fontSize:20,
  },

  text:{
      //color: "white",
      fontSize:15,
  },
});

export default Season;