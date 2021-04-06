import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Gender = ({ type, title }) => {
  
  let background = "";
  let icon = "";

  if (type === "Action") {
    background = "red";
    icon = "exclamation";
  } else if (type === "Adventure") {
    background = "brown";
    icon = "mountain";
  } else if (type === "Cars") {
    background = "red";
    icon = "car";
  }else if (type === "Comedy") {
    background = "#f59622";
    icon = "theater-masks";
  }else if (type === "Drama") {
    background = "gray";
    icon = "grin";
  } else if (type === "Slice Of Life") {
    background = "green";
    icon = "pagelines";
  }else if (type === "Fantasy") {
    background = "black";
    icon = "dragon";
  } else if (type === "Magic") {
    background = "blue";
    icon = "magic";
  } else if (type === "Supernatural") {
    background = "gray";
    icon = "ghost";
  }else if (type === "Horror") {
    background = "black";
    icon = "snapchat-ghost";
  } else if (type === "Mystery") {
    background = "black";
    icon = "question";
  } else if (type === "Psychological") {
    background = "green";
    icon = "universal-access";
  }else if (type === "Romance") {
    background = "red";
    icon = "heart";
  } else if (type === "Sci-Fi") {
    background = "orange";
    icon = "flask";
  } else if (type === "Cyberpunk") {
    background = "blue";
    icon = "robot";
  }else if (type === "Game") {
    background = "red";
    icon = "gamepad";
  } else if (type === "Ecchi") {
    background = "red";
    icon = "heartbeat";
  } else if (type === "Demons") {
    background = "black";
    icon = "book-dead";
  }else if (type === "Harem") {
    background = "red";
    icon = "hand-holding-heart";
  } else if (type === "Josei") {
    background = "pink";
    icon = "female";
  } else if (type === "Martial Arts") {
    background = "red";
    icon = "fist-raised";
  }else if (type === "Kids") {
    background = "blue";
    icon = "child";
  } else if (type === "Historical") {
    background = "brown";
    icon = "book";
  } else if (type === "Isekai") {
    background = "green";
    icon = "globe-asia";
  }else if (type === "Military") {
    background = "green";
    icon = "helicopter";
  } else if (type === "Mecha") {
    background = "gray";
    icon = "robot";
  } else if (type === "Music") {
    background = "#20e9ff";
    icon = "music";
  }else if (type === "Parody") {
    background = "orange";
    icon = "theater-masks";
  } else if (type === "Police") {
    background = "#f59622";
    icon = "galactic-republic";
  } else if (type === "Post-Apocalyptic") {
    background = "blue";
    icon = "atom";
  }else if (type === "Reverse Harem") {
    background = "red";
    icon = "heartbeat";
  } else if (type === "School") {
    background = "black";
    icon = "school";
  } else if (type === "Seinen") {
    background = "gray";
    icon = "male";
  }else if (type === "Shoujo") {
    background = "pink";
    icon = "female";
  }else if (type === "Shoujo-ai") {
    background = "pink";
    icon = "female";
  } else if (type === "Shounen") {
    background = "#f59622";
    icon = "fist-raised";
  } else if (type === "Shounen-ai") {
    background = "red";
    icon = "hand-holding-heart";
  }else if (type === "Space") {
    background = "gray";
    icon = "space-shuttle";
  } else if (type === "Sports") {
    background = "blue";
    icon = "futbol";
  } else if (type === "Super Power") {
    background = "red";
    icon = "fist-raised";
  }else if (type === "Tragedy") {
    background = "black";
    icon = "user-secret";
  }else if (type === "Vampire") {
    background = "red";
    icon = "user-injured";
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
    marginTop:10,
    margin: 3,
    padding: 6,
    flexDirection: "row",
  },

  icon: {
    marginTop:3,
    marginRight: 5,
    fontSize:20,
  },

  text:{
      //color: "white",
      fontSize:15,
  },
});

export default Gender;