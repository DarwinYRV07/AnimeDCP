import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Gender = ({ type, title }) => {
  
  let background = "";
  let icon = "";

  if (type === "Action") {
    background = "#ff0000";
    icon = "exclamation";
  } else if (type === "Adventure") {
    background = "#874d0f";
    icon = "mountain";
  } else if (type === "Cars") {
    background = "#ff0000";
    icon = "car";
  }else if (type === "Comedy") {
    background = "#f59622";
    icon = "theater-masks";
  }else if (type === "Demons") {
    background = "#000000";
    icon = "book-dead";
  }else if (type === "Dementia") {
    background = "#000000";
    icon = "book-dead";
  }else if (type === "Drama") {
    background = "#696866";
    icon = "grin";
  } else if (type === "Slice Of Life") {
    background = "#008015";
    icon = "pagelines";
  }else if (type === "Fantasy") {
    background = "#000000";
    icon = "dragon";
  } else if (type === "Magic") {
    background = "#1708bd";
    icon = "magic";
  } else if (type === "Supernatural") {
    background = "#696866";
    icon = "ghost";
  }else if (type === "Horror") {
    background = "#000000";
    icon = "snapchat-ghost";
  } else if (type === "Mystery") {
    background = "#000000";
    icon = "question";
  } else if (type === "Psychological") {
    background = "#008015";
    icon = "universal-access";
  }else if (type === "Romance") {
    background = "#ff0000";
    icon = "heart";
  } else if (type === "Sci Fi") {
    background = "#c78214";
    icon = "flask";
  } else if (type === "Cyberpunk") {
    background = "#1708bd";
    icon = "robot";
  }else if (type === "Game") {
    background = "#ff0000";
    icon = "gamepad";
  } else if (type === "Ecchi") {
    background = "#ff0000";
    icon = "heartbeat";
  } else if (type === "Harem") {
    background = "#ff0000";
    icon = "hand-holding-heart";
  } else if (type === "Josei") {
    background = "#d61ca1";
    icon = "female";
  } else if (type === "Martial Arts") {
    background = "#ff0000";
    icon = "fist-raised";
  }else if (type === "Kids") {
    background = "#1708bd";
    icon = "child";
  } else if (type === "Historical") {
    background = "#874d0f";
    icon = "book";
  } else if (type === "Thriller") {
    background = "#008015";
    icon = "user-astronaut";
  }else if (type === "Military") {
    background = "#008015";
    icon = "helicopter";
  } else if (type === "Mecha") {
    background = "#696866";
    icon = "robot";
  } else if (type === "Music") {
    background = "#20e9ff";
    icon = "music";
  }else if (type === "Parody") {
    background = "#c78214";
    icon = "theater-masks";
  } else if (type === "Police") {
    background = "#f59622";
    icon = "galactic-republic";
  } else if (type === "Post-Apocalyptic") {
    background = "#1708bd";
    icon = "atom";
  }else if (type === "Reverse Harem") {
    background = "#ff0000";
    icon = "heartbeat";
  } else if (type === "School") {
    background = "#000000";
    icon = "school";
  } else if (type === "Seinen") {
    background = "#696866";
    icon = "male";
  }else if (type === "Shoujo") {
    background = "#d61ca1";
    icon = "female";
  }else if (type === "Shoujo-Ai") {
    background = "#d61ca1";
    icon = "female";
  } else if (type === "Shounen") {
    background = "#f59622";
    icon = "fist-raised";
  } else if (type === "Shounen-ai") {
    background = "#ff0000";
    icon = "hand-holding-heart";
  }else if (type === "Space") {
    background = "#696866";
    icon = "space-shuttle";
  } else if (type === "Sports") {
    background = "#1708bd";
    icon = "futbol";
  } else if (type === "Super Power") {
    background = "#ff0000";
    icon = "fist-raised";
  }else if (type === "Tragedy") {
    background = "#000000";
    icon = "user-secret";
  }else if (type === "Vampire") {
    background = "#ff0000";
    icon = "user-injured";
  }else if (type === "Samurai") {
    background = "#ff0000";
    icon = "khanda";
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