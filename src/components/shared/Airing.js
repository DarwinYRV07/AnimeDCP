import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Airing = ({ type, title }) => {
  
  let background = "";
  let icon = "";

  if (type === true) {
    background = "#008015n";
    icon = "play";
    title="Continue"
  } else if (type === false) {
    background = "#ff0000";
    icon = "stop";
    title = "Finish";
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
    marginRight:3,
    fontSize:20,
  },

  text:{
      //color: "white",
      fontSize:15,
  },
});

export default Airing;